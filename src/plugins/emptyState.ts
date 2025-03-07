import { h } from "vue";
import empty_box from "@/assets/icons/empty.svg";

export default {
    install(app) {
        app.config.globalProperties.$emptyText = () => {
            return h("div", { class: "flex flex-col items-center text-gray-500 mt-6" }, [
                h("img", { src: empty_box, class: "w-32 h-32 mb-2", alt: "No Data" }), // Image
                h("p", { class: "text-lg font-semibold" }, "ບໍ່ມີຂໍ້ມູນ") // Text
            ]);
        };
    }
};
