var openApiRenderer = (function () {
    "use strict";
    return {
        renderContent: function(rawContent, options) {
            try {
                const parsedContent = jsyaml.load(rawContent);

                SwaggerUIBundle({
                    spec: parsedContent,
                    dom_id: '#swagger-container',
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    layout: "BaseLayout"
                });

                document.getElementById("spinner").style.display = "none";
            } catch (err) {
                console.error("Failed to render OpenAPI:", err);
                document.getElementById("swagger-container").innerHTML = "<h2 style='color: red;'>Failed to load OpenAPI content</h2>";
                document.getElementById("spinner").style.display = "none";
            }
        }
    };
}());

VSS.init({
    usePlatformScripts: true, 
    usePlatformStyles: true, 
    explicitNotifyLoaded: true 
});

VSS.ready(function () {
    VSS.register("openapi_preview_renderer", function (context) {
        return openApiRenderer;
    });

    VSS.notifyLoadSucceeded();
});
