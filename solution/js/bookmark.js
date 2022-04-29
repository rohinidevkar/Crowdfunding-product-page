export const initBookmarkHandlers = () => {
    const button = document.querySelector(".bookmark");
    const bookmarkImg = button.querySelector("img");
    const btnText = button.querySelector(".btn-text");

    button.addEventListener("click", handleBookmark);


    function handleBookmark () {
        button.classList.toggle("bookmark-active");

        if (button.classList.contains("bookmark-active")) {
            bookmarkImg.src = "../../images/icon-bookmark-checked.svg"
            btnText.textContent = "Bookmarked";

        } else {
            bookmarkImg.src = "../../images/icon-bookmark.svg";
            btnText.textContent = "Bookmark";
        }
    }
}