export const initModalHandlers = () => {
    // Variables
    const modals = document.querySelectorAll(".modal");
    const closeBtn = document.querySelector(".close-btn-wrapper");
    const openModalButtons = document.querySelectorAll(".open-modal");
    const rewardCards = modals[0].querySelectorAll(".modal .reward-card");
    const selectAwardButtons = document.querySelectorAll(".select-award");
    const forms = document.querySelectorAll("form");

    const gotItBtn = document.querySelector(".close-modal");

    // Closing modal
    gotItBtn.addEventListener("click", handleCloseModal);
    closeBtn.addEventListener("click", handleCloseModal);
    window.addEventListener("click", function (ev) {
        modals.forEach(modal => {
            if (ev.target == modal) {
                handleCloseModal();
            }
        });
    });

    // Open modal
    openModalButtons.forEach(btn => btn.addEventListener("click", handleOpenModal));

    // Handle checkboxs switch in opened modal
    rewardCards.forEach(cb => cb.addEventListener("click", handleCheckboxSwitch))

    // Handle select reward on page product page
    selectAwardButtons.forEach(sb => sb.addEventListener("click", handleSelectAward));

    // Handle submit buttons
    forms.forEach(sb => sb.addEventListener("submit", handleSubmit));

    // Handlers
    function handleOpenModal() {
        modals[0].style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function handleCloseModal() {
        resetModalState();
        modals.forEach(modal => modal.style.display = "none");
        document.body.style.overflow = "auto";
    }

    function handleSelectAward(ev) {
        const title = ev.target.parentElement.parentElement.querySelector(".reward-title").innerHTML;
        const rewardCard = [...document.querySelector(".modal").querySelectorAll(".reward-card")]
            .filter(rc => {
                const searchedTitle = rc.querySelector(".reward-title").innerHTML;
                return searchedTitle.trim() === title.trim();
            })[0];

        handleCheckboxSwitch({ target: rewardCard.querySelector("label") });
    }

    function handleCheckboxSwitch(ev) {
        if (ev.target.parentElement.classList.contains("form-group") || ev.target.parentElement.classList.contains("input-icon")) {
            return;
        }

        const rewardCard = findParentElementByClassName(ev.target, "reward-card");
        const targetCheckbox = rewardCard.querySelector("input[type=checkbox]");
        const pledgeArea = rewardCard.querySelector(".add-pledge-section");

        if (targetCheckbox.checked) {
            targetCheckbox.checked = false;
            rewardCard.style.border = ".75px solid var(--clr-neutral-200)";
            pledgeArea.style.display = "none";
        } else {
            resetModalState();

            targetCheckbox.checked = true;
            rewardCard.style.border = "2px solid var(--clr-primary-400)";
            pledgeArea.style.display = "block";
        }
        targetCheckbox.click();
    }

    function handleSubmit(ev) {
        ev.preventDefault();

        modals[0].style.display = "none";
        modals[1].style.display = "block";

        updateUI(ev);
    }

    // Helper functions
    function findParentElementByClassName(el, className) {
        if (el.classList.contains(className)) {
            return el;
        }

        return findParentElementByClassName(el.parentElement, className);
    }

    function resetModalState() {
        document
            .querySelectorAll(".modal input[type=checkbox]")
            .forEach(cb => cb.checked = false);

        document
            .querySelectorAll(".modal .reward-card")
            .forEach(rc => rc.style.border = ".75px solid var(--clr-neutral-200)");

        document
            .querySelectorAll(".modal .add-pledge-section")
            .forEach(ps => ps.style.display = "none");

        document
            .querySelectorAll("input[type=number]")
            .forEach(inp => inp.value = "");
    }

    function updateUI(ev) {
        const inputValue = parseInt(ev.target.querySelector("input").value);
        const totalBackers = document.querySelector(".total-backers");
        const progressBar = document.querySelector(".progress-bar");
        const currentCount = document.querySelector(".current-backed");
        const totalCount = parseInt(document.querySelector(".total-count").textContent
        .substr(1)
        .match(/\d+,\d+/)[0]
        .replace(/,/g, ''));

        // Handle total new current backed count
        const newTotalCount = parseInt(currentCount.textContent.substr(1).replace(/,/g, '')) + inputValue;
        currentCount.textContent = Intl.NumberFormat("en-US",
            {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(newTotalCount);


        // Handle total backers count
        const newTotalBackers = parseInt(totalBackers.textContent.replace(/,/g, '')) + 1;
        totalBackers.textContent = Intl.NumberFormat("en-US").format(newTotalBackers);
        
        // Handle progress bar increase
        const totalPercent = newTotalCount / totalCount * 100;
        if(totalPercent <= 100) {
            progressBar.style.setProperty("--progress-bar-width", `${totalPercent}%`);
        } else {
            progressBar.style.setProperty("--progress-bar-width", `100%`);
        }

        // Hanlde rewards left count
        const rewardCardDataAttr = ev.target.parentElement.parentElement.getAttribute("data");

        if(!rewardCardDataAttr) {
            return;
        }

        const rewardsLeftMain = document.querySelector(`.reward-card[data=${rewardCardDataAttr}] .left`);
        const rewardsLeftModal = document.querySelector(`.modal .reward-card[data=${rewardCardDataAttr}] .left`);

        rewardsLeftMain.childNodes[0].textContent = String(`${parseInt(rewardsLeftMain.childNodes[0].textContent) - 1} `);
        rewardsLeftModal.childNodes[0].textContent = String(`${parseInt(rewardsLeftModal.childNodes[0].textContent) - 1} `);

        var updatedLeft = parseInt(rewardsLeftMain.childNodes[0].textContent);
        if(updatedLeft <= 0 ) {
            document.querySelector(`.reward-card[data=${rewardCardDataAttr}]`).classList.add("out-of-stock");
            document.querySelector(`.modal .reward-card[data=${rewardCardDataAttr}]`).classList.add("out-of-stock");
        }
    }
}

