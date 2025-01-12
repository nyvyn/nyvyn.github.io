/**
 * This script is a vanilla JavaScript version of the worker.js file.
 * It assumes that the necessary libraries are loaded via script tags in the HTML.
 */

// Singleton pattern for lazy-loading the pipeline
var TextGenerationPipeline = (function () {
    var instance;
    var model_id = "onnx-community/Phi-3.5-mini-instruct-onnx-web";
    var tokenizer, model;

    async function init(progress_callback) {
        tokenizer = await AutoTokenizer.from_pretrained(model_id, {
            progress_callback: progress_callback,
        });

        model = await AutoModelForCausalLM.from_pretrained(model_id, {
            dtype: "q4f16",
            device: "webgpu",
            use_external_data_format: true,
            progress_callback: progress_callback,
        });

        return [tokenizer, model];
    }

    return {
        getInstance: async function (progress_callback) {
            if (!instance) {
                instance = init(progress_callback);
            }
            return instance;
        },
    };
})();

function InterruptableStoppingCriteria() {
    this.interrupted = false;

    this.reset = function() {
        this.interrupted = false;
    };

    this.interrupt = function() {
        this.interrupted = true;
    };

    this.isInterrupted = function() {
        return this.interrupted;
    };
}

var stopping_criteria = new InterruptableStoppingCriteria();
var past_key_values_cache = null;

async function generate(messages) {
    var [tokenizer, model] = await TextGenerationPipeline.getInstance();

    var inputs = tokenizer.apply_chat_template(messages, {
        add_generation_prompt: true,
        return_dict: true,
    });

    var startTime;
    var numTokens = 0;
    var tps;
    var token_callback_function = function () {
        startTime = startTime || performance.now();

        if (numTokens++ > 0) {
            tps = (numTokens / (performance.now() - startTime)) * 1000;
        }
    };
    var callback_function = function (output) {
        self.postMessage({
            status: "update",
            output: output,
            tps: tps,
            numTokens: numTokens,
        });
    };

    var streamer = new TextStreamer(tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: callback_function,
        token_callback_function: token_callback_function,
    });

    // Tell the main thread we are starting
    self.postMessage({ status: "start" });

    var result = await model.generate({
        ...inputs,
        do_sample: true,
        top_k: 3,
        temperature: 0.2,
        max_new_tokens: 1024,
        streamer: streamer,
        stopping_criteria: stopping_criteria,
        return_dict_in_generate: true,
    });

    past_key_values_cache = result.past_key_values;

    var decoded = tokenizer.batch_decode(result.sequences, {
        skip_special_tokens: true,
    });

    // Send the output back to the main thread
    self.postMessage({
        status: "complete",
        output: decoded,
    });
}

async function check() {
    try {
        var adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error("WebGPU is not supported (no adapter found)");
        }
    } catch (e) {
        self.postMessage({
            status: "error",
            data: e.toString(),
        });
    }
}

async function load() {
    self.postMessage({
        status: "loading",
        data: "Loading model...",
    });

    // Load the pipeline and save it for future use.
    var [tokenizer, model] = await TextGenerationPipeline.getInstance(function (x) {
        self.postMessage(x);
    });

    self.postMessage({
        status: "loading",
        data: "Compiling shaders and warming up model...",
    });

    // Run model with dummy input to compile shaders
    var inputs = tokenizer("a");
    await model.generate({ ...inputs, max_new_tokens: 1 });
    self.postMessage({ status: "ready" });
}

// Listen for messages from the main thread
self.addEventListener("message", async function (e) {
    var type = e.data.type;
    var data = e.data.data;

    switch (type) {
        case "check":
            check();
            break;

        case "load":
            load();
            break;

        case "generate":
            stopping_criteria.reset();
            generate(data);
            break;

        case "interrupt":
            stopping_criteria.interrupt();
            break;

        case "reset":
            past_key_values_cache = null;
            stopping_criteria.reset();
            break;
    }
});
