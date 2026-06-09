const addSection = document.getElementById("addsection");
const viewSection = document.getElementById("viewsection");

function darkmode() {

    document.body.classList.toggle("dark");

    const button =
        document.getElementById("darkbutton");

    if (button) {

        if (document.body.classList.contains("dark")) {
            button.innerHTML = "Light Mode";
        } else {
            button.innerHTML = "Dark Mode";
        }

    }

}

function addfeedback() {

    addSection.style.display = "block";
    viewSection.style.display = "none";

}

function viewfeedback() {

    viewSection.style.display = "block";
    addSection.style.display = "none";

    loadFeedbacks();

}

function closeaddform() {

    addSection.style.display = "none";

}

function closeviewform() {

    viewSection.style.display = "none";

}

async function add() {

    const name =
        document.getElementById("name").value;

    const message =
        document.getElementById("message").value;

    const rating =
        document.getElementById("rating").value;

    if (
        name === "" ||
        message === "" ||
        rating === ""
    ) {

        alert("Please fill all fields");
        return;

    }

    const response = await fetch(
        "http://localhost:5000/addFeedback",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                name,
                message,
                rating
            })
        }
    );

    const data =
        await response.json();

    alert(data.message);

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("rating").value = "";

    addSection.style.display = "none";

}

async function loadFeedbacks() {

    const response =
        await fetch(
            "http://localhost:5000/feedbacks"
        );

    const feedbacks =
        await response.json();

    document.getElementById(
        "count"
    ).innerText = feedbacks.length;

    let html = "";

    feedbacks.forEach((feedback) => {

        html += `
        <div class="card">

            <h3>${feedback.name}</h3>

            <p>
            <b>Feedback:</b>
            ${feedback.message}
            </p>

            <p>
            <b>Rating:</b>
            ${feedback.rating}/10
            </p>

            <p>
            <b>Date:</b>
            ${new Date(
                feedback.createdAt
            ).toLocaleString()}
            </p>

            <button
            class="delete-btn"
            onclick="deletefeedback('${feedback._id}')">
            Delete
            </button>

        </div>
        `;

    });

    document.getElementById(
        "feedbacklist"
    ).innerHTML = html;

}

async function deletefeedback(id) {

    await fetch(
        `http://localhost:5000/feedback/${id}`,
        {
            method: "DELETE"
        }
    );

    loadFeedbacks();

}

function searchfeedback() {

    const value =
        document.getElementById("search")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        if (
            card.innerText
            .toLowerCase()
            .includes(value)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}