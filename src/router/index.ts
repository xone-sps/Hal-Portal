import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from '@/stores/useUserStore';
import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import AllCod from "@/pages/cod/AllCod.vue";
import SummaryCod from "@/pages/cod/Summary.vue";
import PendingCod from "@/pages/cod/PendingCod.vue";
import CompleteCod from "@/pages/cod/CompleteCod.vue";
import PendingCodDetail from "@/pages/cod/PendingCodDetail.vue";
import CompleteCodDetail from "@/pages/cod/CompletedCodDetail.vue";
import SelfServiceIndex from "@/pages/selfDelivery/SelfServiceIndex.vue";
import SelfDelivery from "@/pages/selfDelivery/SelfDelivery.vue";
import DeliveryMoreParcel from "@/pages/selfDelivery/DeliveryMoreParcel.vue";
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
import  Profile from "@/pages/Profile.vue";
import  AllAddress from "@/pages/address/AllAddress.vue";
import  SenderAddress from "@/pages/address/Sender.vue";
import  ReceiverAddress from "@/pages/address/Receiver.vue";
import  Login from "@/pages/auth/Login.vue";
import ImportExcel from "@/pages/selfDelivery/ImportExcel.vue";



const routes = [
    {
        path: "/login",
        component: AuthLayout,
        children: [
            {
                path: "",
                name: "login",
                component: Login,
            },
        ],
    },
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "",
                name: "dashboard",
                component: Dashboard,
                meta: {requiresAuth: true, title: "Dashboard", description: "ສະຖິຕິພາບລວມການເຄື່ອນໄຫວພັດສະດຸຂອງທ່ານ" },
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
                            requiresAuth: true,
                            title: "ສະຫຼຸບຍອດ COD",
                            description: "ລາຍລະອຽດການເກັບເງິນປາຍທາງ (COD)",
                        },
                    },
                    {
                        path: "pending",
                        name: "cod-pending",
                        component: PendingCod,
                        meta: {
                            requiresAuth: true,
                            title: "ລໍຖ້າການໂອນ",
                            description: "ລາຍການ COD ທີ່ກຳລັງລໍຖ້າການໂອນ",
                        },
                    },
                    {
                        path: "completed",
                        name: "cod-completed",
                        component: CompleteCod,
                        meta: {
                            requiresAuth: true,
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
                    requiresAuth: true,
                    title: "ລາຍລະອຽດລໍຖ້າການໂອນ COD",
                    description: "",
                },
            },
            {
                path: "completed/detail",
                name: "completed-detail",
                component: CompleteCodDetail,
                meta: {
                    requiresAuth: true,
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
            //     path: "",
            //     redirect: "/self-service/one-parcel",
            // },
            {
                path: "",
                component: SelfServiceIndex, // ✅ This should be a wrapper component with <router-view />
                meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "one-parcel", // ✅ Correct relative path
                        name: "one-parcel",
                        component: SelfDelivery,
                        meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ - ສົ່ງ 1 ຊິ້ນ", description: "" },
                    },
                    {
                        path: "multiple-parcel", // ✅ Correct relative path
                        name: "multiple-parcel",
                        component: DeliveryMoreParcel,
                        meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ - ສົ່ງຫຼາຍຊິ້ນ", description: "" },
                    },
                    {
                        path: "my-parcel", // ✅ Correct relative path
                        name: "my-parcel",
                        component: import('@/pages/selfDelivery/MyParcel.vue'),
                        meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ", description: "" },
                    },
                    {
                        path: "import-excel", // ✅ Correct relative path
                        name: "import-excel",
                        component: ImportExcel,
                        // component: import('@/pages/selfDelivery/ImportExcel.vue'),
                        meta: {requiresAuth: true, title: "Import Excel", description: "" },
                    },
                    {
                        path: "import-excel/upload-preview", // ✅ Correct relative path
                        name: "import-excel-preview",
                        component: import('@/pages/selfDelivery/UploadPreview.vue'),
                        meta: {requiresAuth: true, title: "Import Excel Preview", description: "" },
                    },
                    {
                        path: "import-excel/upload-success", // ✅ Correct relative path
                        name: "import-excel-success",
                        component: import('@/pages/selfDelivery/Success.vue'),
                        meta: {requiresAuth: true, title: "Import Excel Success", description: "" },
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
                meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "", // ✅ Correct relative path
                        name: "outbound-processing",
                        component: OutboundProcessing,
                        meta: {requiresAuth: true, title: "ກໍາລັງຈັດສົ່ງ", description: "" },
                    },
                    {
                        path: "arrived", // ✅ Correct relative path
                        name: "outbound-arrived",
                        component: OutboundArrived,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຮອດສາຂາປາຍທາງ", description: "" },
                    },
                    {
                        path: "delivered", // ✅ Correct relative path
                        name: "outbound-delivered",
                        component: OutboundDelivered,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຈັດສົ່ງສໍາເລັດ", description: "" },
                    },
                    {
                        path: "return", // ✅ Correct relative path
                        name: "outbound-return",
                        component: OutboundReturn,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຕີກັບ", description: "" },
                    },
                    {
                        path: "returned", // ✅ Correct relative path
                        name: "outbound-returned",
                        component: OutboundReturned,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຕີກັບສໍາເລັດ", description: "" },
                    },
                ]
            },
            {
                path: "outbound/detail/$id",
                name: "outbound-detail",
                component: OutboundDetail,
                meta: {requiresAuth: true, title: "ລາຍລະອຽດພັດສະດຸຂາອອກ", description: "" },
            },
            // Inbound route
            {
                path: "inbound",
                component: InboundIndex,
                meta: {requiresAuth: true, title: "ຝາກເຄື່ອງເອງ", description: "" },
                children: [
                    {
                        path: "", // ✅ Correct relative path
                        name: "inbound-processing",
                        component: InboundProcessing,
                        meta: {requiresAuth: true, title: "ກໍາລັງຈັດສົ່ງ", description: "" },
                    },
                    {
                        path: "arrived", // ✅ Correct relative path
                        name: "inbound-arrived",
                        component: InboundArrived,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຮອດສາຂາປາຍທາງ", description: "" },
                    },
                    {
                        path: "delivered", // ✅ Correct relative path
                        name: "inbound-delivered",
                        component: InboundDelivered,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຈັດສົ່ງສໍາເລັດ", description: "" },
                    },
                    {
                        path: "return", // ✅ Correct relative path
                        name: "inbound-return",
                        component: InboundReturn,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຕີກັບ", description: "" },
                    },
                    {
                        path: "returned", // ✅ Correct relative path
                        name: "inbound-returned",
                        component: InboundReturned,
                        meta: {requiresAuth: true, title: "ພັດສະດຸຕີກັບສໍາເລັດ", description: "" },
                    },
                ]
            },
            {
                path: "inbound/detail/:trackingId",
                name: "inbound-detail",
                component: InboundDetail,
                meta: {requiresAuth: true, title: "ລາຍລະອຽດພັດສະດຸຂາເຂົ້າ", description: "" },
            },

        ]

    },
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "profile",
                name: "profile",
                component: Profile,
                meta: {requiresAuth: true, title: "ຂໍ້ມູນທົ່ວໄປ", description: "" },
            },
        ],
    },
    //Address Route
    {
        path: "/address",
        component: DefaultLayout,
        children: [
            {
                path: "", // Empty path
                redirect: "/address/sender", // ✅ Redirect to summary tab
            },
            {
                path: "",
                component: AllAddress, // ✅ This will be the parent of the COD tabs
                children: [
                    {
                        path: "sender",
                        name: "address-sender",
                        component: SenderAddress,
                        meta: {
                            requiresAuth: true,
                            title: "ທີ່ຢູ່ຜູ້ສົ່ງ",
                            description: "",
                        },
                    },
                    {
                        path: "receiver",
                        name: "address-receiver",
                        component: ReceiverAddress,
                        meta: {
                            requiresAuth: true,
                            title: "ທີ່ຢູ່ຜູ້ຮັບ",
                            description: "",
                        },
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (to.path !== '/login' && !userStore.token) {
        next('/login');
    } else {
        next();
    }
});


export default router;
