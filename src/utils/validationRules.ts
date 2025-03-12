export const validationRules = {
//Self Delivery Validation
    phone: [{ required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" }],
    password: [{ required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານ", trigger: "blur" }],
    receiverName: [{ required: true, message: "ກະລຸນາປ້ອນຊື່", trigger: "blur" }],
    receiverPhone: [
        { required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" },
        { pattern: /^020\d{8}$/, message: "ເບີໂທຕ້ອງເປັນ 020XXXXXXXX", trigger: "blur" }
    ],
    receiverAddress: [{ required: true, message: "ກະລຸນາປ້ອນທີ່ຢູ່", trigger: "blur" }],
    originValue: [{ required: true, message: "ກະລຸນາເລືອກສາຂາຕົ້ນທາງ", trigger: "change" }],
    destinationValue: [{ required: true, message: "ກະລຸນາເລືອກສາຂາປາຍທາງ", trigger: "change" }],
    parcelType: [{ required: true, message: "ເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    parcelCategoryValue: [{ required: true, message: "ກະລຸນາເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    parcelDimensions: [{ required: true, message: "ປ້ອນຂະໜາດ", trigger: "blur" }],
    parcelWeight: [{ required: true, message: "ປ້ອນນໍ້າໜັກ", trigger: "blur" }],
    selectedServices: [
        {
            validator: (_, value) =>
                value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("ກະລຸນາເລືອກບໍລິການເສີມ")),
            trigger: "change",
        },
    ],
    userName: [{ required: true, message: "ກະລຸນາປ້ອນຊື່", trigger: "blur" }],
    surname: [{ required: true, message: "ກະລຸນາປ້ອນນາມສະກຸນ", trigger: "blur" }],
    userAddress: [{ required: true, message: "ກະລຸນາປ້ອນທີ່ຢູ່", trigger: "change" }],
    province: [{ required: true, message: "ເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    city: [{ required: true, message: "ເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    village: [{ required: true, message: "ເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    branch: [{ required: true, message: "ເລືອກສາຂາ", trigger: "change" }],

};
