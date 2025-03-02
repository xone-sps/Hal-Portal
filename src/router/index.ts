import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import AllCod from "@/pages/cod/AllCod.vue";
import SummaryCod from "@/pages/cod/Summary.vue";
import PendingCod from "@/pages/cod/PendingCod.vue";
import CompleteCod from "@/pages/cod/CompleteCod.vue";
import PendingCodDetail from "@/pages/cod/PendingCodDetail.vue";
import CompleteCodDetail from "@/pages/cod/CompletedCodDetail.vue";
import SelfServiceIndex from "@/pages/selfdelivery/SelfServiceIndex.vue";
import SelfDelivery from "@/pages/selfdelivery/SelfDelivery.vue";
import DeliveryMoreParcel from "@/pages/selfdelivery/DeliveryMoreParcel.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "",
                name: "dashboard",
                component: Dashboard,
                meta: { title: "Dashboard", description: "ສະຖິຕິພາບລວມການເຄື່ອນໄຫວພັດສະດຸຂອງທ່ານ" },
            },
        ],
    },

    //Cod Route
    {
        path: "/cod",
        component: DefaultLayout,
        children: [
            {
                path: "", // Empty path
                redirect: "/cod/summary", // ✅ Redirect to summary tab
            },
            {
                path: "",
                component: AllCod, // ✅ This will be the parent of the COD tabs
                children: [
                    {
                        path: "summary",
                        name: "cod-summary",
                        component: SummaryCod,
                        meta: {
                            title: "ສະຫຼຸບຍອດ COD",
                            description: "ລາຍລະອຽດການເກັບເງິນປາຍທາງ (COD)",
                        },
                    },
                    {
                        path: "pending",
                        name: "cod-pending",
                        component: PendingCod,
                        meta: {
                            title: "ລໍຖ້າການໂອນ",
                            description: "ລາຍການ COD ທີ່ກຳລັງລໍຖ້າການໂອນ",
                        },
                    },
                    {
                        path: "completed",
                        name: "cod-completed",
                        component: CompleteCod,
                        meta: {
                            title: "ໂອນສຳເລັດ",
                            description: "ລາຍການ COD ທີ່ໄດ້ຮັບເງິນແລ້ວ",
                        },
                    },
                ],
            },
            {
                path: "pending/detail",
                name: "pending-detail",
                component: PendingCodDetail,
                meta: {
                    title: "ລາຍລະອຽດລໍຖ້າການໂອນ COD",
                    description: "",
                },
            },
            {
                path: "completed/detail",
                name: "completed-detail",
                component: CompleteCodDetail,
                meta: {
                    title: "ລາຍລະອຽດໂອນສຳເລັດ",
                    description: "ລາຍການ COD ທີ່ໄດ້ຮັບເງິນແລ້ວ",
                },
            },
        ],
    },

    //Self Delivery
    {
        path: "/self-service",
        component: DefaultLayout,
        children: [
            // {
            //     path: "", // Empty path
            //     redirect: "/self-service/one-parcel", // ✅ Redirect to summary tab
            // },
            {
                path: "",
                component: SelfServiceIndex,
                meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "/one-parcel",
                        name: "one-parcel",
                        component: SelfDelivery,
                        meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                    },
                    {
                        path: "/multiple-parcel",
                        name: "multiple-parcel",
                        component: DeliveryMoreParcel,
                        meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                    }
                ]
            },

        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
