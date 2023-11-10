// Initialize the current player as 'X'
// Set game_active to true
let current_player = 'X';
let game_active = true;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () =>
{
    // Start the game when the DOM is loaded
    start_game();
});

// Goes through the cells in the grid and resets their content
function start_game()
{
    // Select all elements with the class '.cell'
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell =>
    {
        cell.innerText = '';
        cell.classList.remove('taken');
    });

    // Set game_active to true and current_player to X
    game_active = true;
    current_player = 'X';

    // Display whose turn it is on the page
    document.getElementById('game_status').innerText = `Player ${current_player}'s turn`;
}

// When the new game button is clicked, start a new game
function new_game()
{
    start_game();
}

// When a cell is clicked on, display either an X or an O depending on who the player is
// and make it so the cell can't be clicked on again until the game restarts
function on_click_cell(event)
{
    // Get the clicked cell element
    const cell = event.target;

    // Set the text content of the cell to the current player
    cell.innerText = current_player;

    // Set the cell to 'taken'
    cell.classList.add('taken');

    // Using setTimeout, wait 1 second before checking whether the player
    // has won or if we need to keep going
    setTimeout(() =>
    {
        // Check the win conditions
        win_condition();

        // Switch to the next player
        current_player = current_player === 'X' ? 'O' : 'X';

        // Display whose turn it is on the page
        document.getElementById('game_status').innerText = `Player ${current_player}'s turn`;
    }, 1);
}

// Function to check the win conditions
function win_condition()
{
    // Select all elements with the class 'cell'
    const cells = document.querySelectorAll('.cell');

    // List all possible win conditions in tic-tac-toe
    const winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    // Iterate over each winning combination
    winning_combos.forEach(condition =>
    {
        // Parse out the possible win condition into individual variables
        const [a, b, c] = condition;

        const cell_a = cells[a].innerText;
        const cell_b = cells[b].innerText;
        const cell_c = cells[c].innerText;

        // Check to see if all the cells match each other
        if ((cell_a ===  cell_b) && (cell_a === cell_c))
        {
            // If true, stop the game and display the winner
            game_active = false;
            document.getElementById('game_status').innerText = `Player ${cell_a} Wins!`;
        }
    });
}

// Create the 3 x 3 grid when the page is loaded
window.onload = function()
{
    // Get the grid container element
    const grid = document.getElementById('ttt_grid');

    // Create each cell that makes up the 3x3 grid
    for (let i = 0; i < 9; i++)
    {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', on_click_cell);
        grid.appendChild(cell);
    }
};

function back_to_index()
{
    window.location.href = "index.html";
}
