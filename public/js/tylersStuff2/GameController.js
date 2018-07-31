function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// game controller to manage the execution of tanks
// has what gamecycle it is currently on and whether it is running
function GameController (gInt, cLim) {
	this.cycle = 0;
	this.running = false;
	this.gameInterval = gInt;
	this.cycleLimit = cLim;
	// start function to initiate game loop

	this.start = () => {
		this.running = true;
		this.loop();
	}

	// stop function to end game execution

	this.stop = () => {
		this.running = false;
	}

	// for each tank (if alive) call step function to execute next line of tank command

	this.RunTanks = () => {
		for (var i = 0; i < SG.tankObjects.length; i++) {
			if (SG.tankObjects[i].alive) {
				SG.tankObjects[i].step();
			}
		}
	}

	// the other have of the async function where while the game state is still running,
	// update game cycle display
	// call runTanks method
	// then wait the configured game interval for next cycle
	// then increment game cycle
	this.loop = async () => {
		while (this.running) {
			if (this.cycle >= this.cycleLimit) {
				this.running = false;
			}
			//console.log("Current Game Cycle: " + this.cycle);
			$("#gcDisplay").val(this.cycle);
			this.RunTanks();
			await sleep(this.gameInterval);
			this.cycle++;
		}
	}

}