document.addEventListener("DOMContentLoaded", () => {
    const gamepadInfo = document.getElementById("gamepad-info");
    const gamepadData = document.getElementById("gamepad-data");
    let gamepadType = "";
    const labelNorth = document.querySelector(".label-north");
    const labelSouth = document.querySelector(".label-south");
    const labelEast = document.querySelector(".label-east");
    const labelWest = document.querySelector(".label-west");
    const labelNE = document.querySelector(".label-ne");
    const labelSE = document.querySelector(".label-se");
    const labelSW = document.querySelector(".label-sw");
    const labelNW = document.querySelector(".label-nw");

    const buttonMap = {
        0: 'button-X',
        1: 'button-A',
        2: 'button-B',
        3: 'button-Y',
        4: 'button-L',
        5: 'button-R',
        8: 'button-SEL',
        9: 'button-STR',
    };

    function updateGamepadStatus() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        let gamepadConnected = false;

        for (let i = 0; i < gamepads.length; i++) {
            const gp = gamepads[i];
            if (gp) {
                gamepadConnected = true;
                gamepadType = gp.id;
                // Reset label classes
                labelNorth.classList.remove('active-label');
                labelSouth.classList.remove('active-label');
                labelEast.classList.remove('active-label');
                labelWest.classList.remove('active-label');
                labelNE.classList.remove('active-label');
                labelSE.classList.remove('active-label');
                labelSW.classList.remove('active-label');
                labelNW.classList.remove('active-label');

                // Update compass labels based on axis values
                if (gp.axes[1] === -1 && gp.axes[0] === 0) {
                    labelNorth.classList.add('active-label');
                } else if (gp.axes[1] === 1 && gp.axes[0] === 0) {
                    labelSouth.classList.add('active-label');
                } else if (gp.axes[0] === -1 && gp.axes[1] === 0) {
                    labelWest.classList.add('active-label');
                } else if (gp.axes[0] === 1 && gp.axes[1] === 0) {
                    labelEast.classList.add('active-label');
                } else if (gp.axes[1] === -1 && gp.axes[0] === -1) {
                    labelNW.classList.add('active-label');
                } else if (gp.axes[1] === -1 && gp.axes[0] === 1) {
                    labelNE.classList.add('active-label');
                } else if (gp.axes[1] === 1 && gp.axes[0] === -1) {
                    labelSW.classList.add('active-label');
                } else if (gp.axes[1] === 1 && gp.axes[0] === 1) {
                    labelSE.classList.add('active-label');
                } else if (gp.axes[1] === -1) {
                    labelNorth.classList.add('active-label');
                } else if (gp.axes[1] === 1) {
                    labelSouth.classList.add('active-label');
                } else if (gp.axes[0] === -1) {
                    labelWest.classList.add('active-label');
                } else if (gp.axes[0] === 1) {
                    labelEast.classList.add('active-label');
                }

                // Update button states
                gp.buttons.forEach((button, index) => {
                    const buttonElement = document.getElementById(buttonMap[index]);
                    if (buttonElement) {
                        if (button.pressed) {
                            buttonElement.classList.add('active'); // Use active class
                        } else {
                            buttonElement.classList.remove('active'); // Remove active class
                        }
                    }
                });

                gamepadData.style.display = "block";
                gamepadInfo.innerHTML = `
                <h2>Gamepad Connected</h2>
                <p>Index: ${gp.index}</p>
                <p>ID: ${gp.id}</p>
                `;
                break;
            }
        }

        if (!gamepadConnected) {
            gamepadInfo.innerHTML = `<h2>No gamepad connected.</h2>`;
            gamepadData.style.display = "none";
        }
    }

    window.addEventListener("gamepadconnected", () => {
        console.log("Gamepad connected");
        updateGamepadStatus();
    });

    window.addEventListener("gamepaddisconnected", () => {
        console.log("Gamepad disconnected");
        updateGamepadStatus();
    });

    function testLoop() {
        updateGamepadStatus();
        requestAnimationFrame(testLoop);
    }

    testLoop();
});
