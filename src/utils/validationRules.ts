export const validationRules = {
//Self Delivery Validation
    phone: [{ required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" }],
    password: [{ required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານ", trigger: "blur" }],
    receiverName: [{ required: true, message: "ກະລຸນາປ້ອນຊື່", trigger: "blur" }],
    receiverPhone: [
        { required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" },
        {
          validator: (_rule: any, value: any) => {
            const phoneRegex = /^[0-9]{8}$/;
            return phoneRegex.test(value)
              ? Promise.resolve()
              : Promise.reject(new Error("ເບີໂທບໍ່ຖືກຕ້ອງ"));
          },
          trigger: "blur",
        },
      ],
    // receiverPhone: [{ required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" }],
    receiverAddress: [{ required: true, message: "ກະລຸນາປ້ອນທີ່ຢູ່", trigger: "blur" }],
    originBranchValue: [{ required: true, message: "ກະລຸນາເລືອກສາຂາຕົ້ນທາງ", trigger: "change" }],
    destinationBranchValue: [{ required: true, message: "ກະລຸນາເລືອກສາຂາປາຍທາງ", trigger: "change" }],
    parcelType: [{ required: true, message: "ເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    parcelCategoryValue: [{ required: true, message: "ກະລຸນາເລືອກປະເພດພັດສະດຸ", trigger: "change" }],
    parcelDimensions: [{ required: true, message: "ປ້ອນຂະໜາດ", trigger: "blur" }],
    weight: [{ required: true, message: "ປ້ອນນໍ້າໜັກ", trigger: "blur" }],
    parcelPrice: [{ required: true, message: "ປ້ອນນໍ້າໜັກ", trigger: "blur" }],
    selectedServices: [
        {
            validator: (value:any) =>
                value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("ກະລຸນາເລືອກບໍລິການເສີມ")),
            trigger: "change",
        },
    ],
    name: [{ required: true, message: "ກະລຸນາປ້ອນຊື່", trigger: "blur" }],
    surname: [{ required: true, message: "ກະລຸນາປ້ອນນາມສະກຸນ", trigger: "blur" }],
    userAddress: [{ required: true, message: "ກະລຸນາປ້ອນທີ່ຢູ່", trigger: "change" }],
    province_id: [{ required: true, message: "ເລືອກແຂວງ", trigger: "change" }],
    district_id: [{ required: true, message: "ເລືອກເມືອງ", trigger: "change" }],
    village_id: [{ required: true, message: "ເລືອກບ້ານ", trigger: "change" }],
    branch: [{ required: true, message: "ເລືອກສາຂາ", trigger: "change" }],
};

export const getValidationRules = (prefixGetter: () => string) => {
    const validatePhone = (_rule: any, value: string) => {
        return new Promise((resolve, reject) => {
            const fullPhone = `${prefixGetter()}${value}`;
            const regex = /^0[23]0\d{6,8}$/;
            if (regex.test(fullPhone)) {
                resolve(true);
            } else {
                reject(new Error("ເບີໂທຕ້ອງເປັນ 020XXXXXX ຫຼື 030XXXXXX"));
            }
        });
    };

    return {
        receiverPhone: [
            { required: true, message: "ກະລຸນາປ້ອນເບີໂທ", trigger: "blur" },
            { validator: validatePhone, trigger: "blur" }
        ],
        // ... other rules
    };
};
