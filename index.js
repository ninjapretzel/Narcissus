
/** Type for simulating console output */
export function SimConsole() {
	this.buffer = "";
	this.print = (thing) => { this.buffer += thing; }
	this.println = (thing) => { this.buffer += thing + "\n"; }
	this.clear = () => { this.buffer = ""; }
}

/** Reference to simulated console */
export const simConsole = new SimConsole();
/** Reference to namespace that is injected every run */
export const injected = {
	print: simConsole.print,
	println: simConsole.println,
	console: { log: simConsole.println },
};
let runTask = null;
export async function exec(code) {
	console.log("Exec(" + code + ")");
	return (runTask = evaluate(code, "dynamic", 1, injected));
}
export async function extract() { return await runTask(); }


$(document).ready(()=>{
	$("#run").click(async ()=>{
		console.log("Fuck");
		const input = $("#input").val()
		simConsole.clear();
		await exec(input);
		$("#output").val(simConsole.buffer);
	});
	
});