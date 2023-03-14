class CarMovement {
    static init(ctx){
        ctx.font = "21px Verdana";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Car Movement", ctx.canvas.width / 2, ctx.canvas.height / 3.6);
    }

    static update(ctx, network) {
        const margin = 50;
        const left = margin;
        const width = ctx.canvas.width - margin * 2;
        const right = left + width
        const top = margin;
        const N = network.levels.length-1;
        const lastLevel = network.levels[N];
        const outputs = lastLevel.outputs;
        const nodeRadius = 20;
        for (let i = 0; i < 4; i++) {
            const x = lerp(
                left,
                right,
                i / 3
            );

            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = outputs[i]==0 ?"white" : "turquoise";
            ctx.fill();

            const outputLabels = ['⬆', '⬅', '➡', '⬇'];
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
            ctx.font = (nodeRadius * 1.5) + "px Arial";
            ctx.fillText(outputLabels[i], x, top + nodeRadius * 0.1);
            ctx.lineWidth = 0.8;
            ctx.strokeText(outputLabels[i], x, top + nodeRadius * 0.1);

        }
    }
}

