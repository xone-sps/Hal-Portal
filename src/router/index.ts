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
import OutboundIndex from "@/pages/parcel/outboundParcel/OutboundIndex.vue";
import OutboundProcessing from "@/pages/parcel/outboundParcel/OutboundProcessing.vue";
import OutboundArrived from "@/pages/parcel/outboundParcel/OutboundArrived.vue";
import OutboundDelivered from "@/pages/parcel/outboundParcel/OutboundDelivered.vue";
import OutboundReturn from "@/pages/parcel/outboundParcel/OutboundReturn.vue";
import OutboundReturned from "@/pages/parcel/outboundParcel/OutboundReturned.vue";
import OutboundDetail from "@/pages/parcel/outboundParcel/OutboundDetail.vue";
import InboundIndex from "@/pages/parcel/inboundParcel/InboundIndex.vue";
import InboundProcessing from "@/pages/parcel/inboundParcel/InboundProcessing.vue";
import InboundArrived from "@/pages/parcel/inboundParcel/InboundArrived.vue";
import InboundDelivered from "@/pages/parcel/inboundParcel/InboundDelivered.vue";
import InboundReturn from "@/pages/parcel/inboundParcel/InboundReturn.vue";
import InboundReturned from "@/pages/parcel/inboundParcel/InboundReturned.vue";
import InboundDetail from "@/pages/parcel/inboundParcel/InboundDetail.vue";



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
            {
                path: "", // Empty path for `/self-service`
                redirect: "/self-service/one-parcel", // ✅ Always redirect to first tab
            },
            {
                path: "",
                component: SelfServiceIndex, // ✅ This should be a wrapper component with <router-view />
                meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "one-parcel", // ✅ Correct relative path
                        name: "one-parcel",
                        component: SelfDelivery,
                        meta: { title: "ຝາກເຄື່ອງເອງ - ສົ່ງ 1 ຊິ້ນ", description: "" },
                    },
                    {
                        path: "multiple-parcel", // ✅ Correct relative path
                        name: "multiple-parcel",
                        component: DeliveryMoreParcel,
                        meta: { title: "ຝາກເຄື່ອງເອງ - ສົ່ງຫຼາຍຊິ້ນ", description: "" },
                    }
                ]
            }
        ]
    },
    // Outbound parcel  and Inbound parcel

    {
        path: "/parcel",
        component: DefaultLayout,
        children: [
            //Outbound route
            {
                path: "outbound",
                component: OutboundIndex,
                meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "processing", // ✅ Correct relative path
                        name: "outbound-processing",
                        component: OutboundProcessing,
                        meta: { title: "ກໍາລັງຈັດສົ່ງ", description: "" },
                    },
                    {
                        path: "arrived", // ✅ Correct relative path
                        name: "outbound-arrived",
                        component: OutboundArrived,
                        meta: { title: "ພັດສະດຸຮອດສາຂາປາຍທາງ", description: "" },
                    },
                    {
                        path: "delivered", // ✅ Correct relative path
                        name: "outbound-delivered",
                        component: OutboundDelivered,
                        meta: { title: "ພັດສະດຸຈັດສົ່ງສໍາເລັດ", description: "" },
                    },
                    {
                        path: "return", // ✅ Correct relative path
                        name: "outbound-return",
                        component: OutboundReturn,
                        meta: { title: "ພັດສະດຸຕີກັບ", description: "" },
                    },
                    {
                        path: "returned", // ✅ Correct relative path
                        name: "outbound-returned",
                        component: OutboundReturned,
                        meta: { title: "ພັດສະດຸຕີກັບສໍາເລັດ", description: "" },
                    },
                ]
            },
            {
                path: "outbound/detail/$id",
                name: "outbound-detail",
                component: OutboundDetail,
                meta: { title: "ລາຍລະອຽດພັດສະດຸຂາອອກ", description: "" },
            },
            // Inbound route
            {
                path: "inbound",
                component: InboundIndex,
                meta: { title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "processing", // ✅ Correct relative path
                        name: "inbound-processing",
                        component: InboundProcessing,
                        meta: { title: "ກໍາລັງຈັດສົ່ງ", description: "" },
                    },
                    {
                        path: "arrived", // ✅ Correct relative path
                        name: "inbound-arrived",
                        component: InboundArrived,
                        meta: { title: "ພັດສະດຸຮອດສາຂາປາຍທາງ", description: "" },
                    },
                    {
                        path: "delivered", // ✅ Correct relative path
                        name: "inbound-delivered",
                        component: InboundDelivered,
                        meta: { title: "ພັດສະດຸຈັດສົ່ງສໍາເລັດ", description: "" },
                    },
                    {
                        path: "return", // ✅ Correct relative path
                        name: "inbound-return",
                        component: InboundReturn,
                        meta: { title: "ພັດສະດຸຕີກັບ", description: "" },
                    },
                    {
                        path: "returned", // ✅ Correct relative path
                        name: "inbound-returned",
                        component: InboundReturned,
                        meta: { title: "ພັດສະດຸຕີກັບສໍາເລັດ", description: "" },
                    },
                ]
            },
            {
                path: "inbound/detail/$id",
                name: "inbound-detail",
                component: InboundDetail,
                meta: { title: "ລາຍລະອຽດພັດສະດຸຂາເຂົ້າ", description: "" },
            },
        ]

    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
