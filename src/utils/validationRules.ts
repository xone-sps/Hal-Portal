export const validationRules = {
//Self Delivery Validation
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

};
