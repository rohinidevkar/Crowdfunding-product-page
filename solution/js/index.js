import { initBookmarkHandlers } from "./bookmark.js";
import { initModalHandlers } from "./modal.js";
import { initNavigationHandlers } from "./navigation.js";

main();

function main() {
    initBookmarkHandlers();
    initModalHandlers();
    initNavigationHandlers();
};
