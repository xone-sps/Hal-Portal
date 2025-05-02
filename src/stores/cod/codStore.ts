import { defineStore } from "pinia";
import { api } from "@/plugins/axios.ts";
import { ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

export const useCodStore = defineStore("codStore", {
  state: () => ({
    totalQty: 0,
    codSummary: 0,
    codFee: 0,
    transferFee: 0,
    cod_fee_percent: 0,
    codList: [] as any[], // COD list array
    loading: false,
    codListStatus: [] as any[],
    estimate_receive_date: "",
    successCOD: {},
    codDetail: {},
    pagination: {
      nextPageUrl: null,
      prevPageUrl: null,
      cursor: "",
      currentPage: 1, // ✅ Add currentPage
      pageSize: 25, // ✅ Add pageSize
      totalItems: 0,
    },
    startDate: dayjs().subtract(3, "month") as Dayjs | null, // ✅ Initialize as Dayjs object
    endDate: dayjs() as Dayjs | null, // ✅ Initialize as Dayjs object
  }),
  actions: {
    // ✅ Add cursor as a parameter and set a default value
    async fetchCodData(cursor = "") {
      this.loading = true;
      try {
        const response = await api.get("/summarize/cod/owner/list", {
          params: {
            use_cursor: true,
            cursor,
            per_page: this.pagination.pageSize,
            current_page: this.pagination.currentPage,
          },
        });

        if (response.data && !response.data.error) {
          const data = response.data.data;
          this.totalQty = data.total_qty;
          this.codSummary = data.total_price;
          this.codFee = data.cod_fee;
          this.transferFee = data.transfer_fee;
          this.cod_fee_percent = data.cod_fee_percent;
          this.estimate_receive_date = data.estimate_receive_date;
          this.codList = data.data;
          // ✅ Update Pagination State
          this.pagination.nextPageUrl = data.next_page_url || null;
          this.pagination.prevPageUrl = data.prev_page_url || null;
          this.pagination.cursor = cursor;
          this.pagination.totalItems = data.total_qty; // ✅ S
        }
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchCodStatusData({ status = "", cursor = "" } = {}) {
      this.loading = true;
      try {
        const response = await api.get("/cod/owner/list", {
          params: {
            status: status,
            start_date: dayjs(this.startDate).format("YYYY-MM-DD"),
            end_date: dayjs(this.endDate).format("YYYY-MM-DD"),
            use_cursor: true,
            cursor,
            per_page: this.pagination.pageSize,
            current_page: this.pagination.currentPage,
          },
        });

        if (response.data && !response.data.error) {
          const data = response.data.data;
          // this.totalQty = data.total_qty;
          // this.codSummary = data.total_price;
          // this.codFee = data.cod_fee;
          // this.transferFee = data.transfer_fee;
          // this.cod_fee_percent = data.cod_fee_percent;
          this.codListStatus = data?.data;
          // ✅ Update Pagination State
          this.pagination.nextPageUrl = data?.next_page_url || null;
          this.pagination.prevPageUrl = data?.prev_page_url || null;
          this.pagination.cursor = cursor;
          this.pagination.totalItems = data?.total_qty;
        }
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    generateRandomId(): number {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomPart = Math.floor(Math.random() * 1000); // Random number between 0 and 999
      return parseInt(`${timestamp}${randomPart}`); // Combine timestamp and random part
    },

    async downloadPdf(data: any) {
      const randomId = ref(this.generateRandomId().toString());
      this.loading = true;
      try {
        // Make the API call to get the PDF file
        const response = await api.post(
          "download-cod-receipt-template/" + data.id,
          {
            request_id: randomId.value,
          },
          {
            responseType: "blob", // Ensure the response is treated as binary data
          }
        );

        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = `cod-receipt-${data.id}.pdf`; // Set the file name
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
      } catch (error) {
        notification.error({
          message: "ຜິດພາດ!",
          description:
            error.response?.data?.message ||
            "An error occurred while downloading the PDF.",
          placement: "topRight",
          duration: 10, // Auto close in 10 seconds
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async confirmCOD() {
      const randomId = ref(this.generateRandomId().toString());
      this.loading = true;
      try {
        const response = await api.post("confirm/cod/owner", {
          request_id: randomId.value,
        });
        if (response.data && !response.data.error) {
          this.successCOD = response.data;
        }
      } catch (error) {
        notification.error({
          message: "ຜິດພາດ!",
          description: error.response.data.message,
          placement: "topRight",
          duration: 10, // Auto close in 5 seconds
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchCodDetail(id: string) {
      console.log("fetchCodDetail", id);
      this.loading = true;
      try {
        const response = await api.get(`/cod/owner/list/${id}`); // Use template literals for cleaner concatenation

        if (response.data && !response.data.error) {
          const data = response.data;
          this.codDetail = data.data;
          console.log("codDetail", this.codDetail);
        }
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async viewDetails(id: string, router: Router) {
        // Navigate to the "cod-detail" route with the correct id
        router.push({ name: "cod-detail", params: { id } });
    
        // Fetch details using the correct id
        await this.fetchCodDetail(id);
    },
    async searchQuery() {
      if (this.startDate != null && this.endDate != null) {
        this.fetchCodStatusData({ status: "success" });
      }
    },
    async clearSearch() {
      this.startDate = null;
      this.endDate = null;
    },
    // ✅ Next Page
    // async fetchNextPage() {
    //     if (this.pagination.nextPageUrl) {
    //         const pattern = 'cursor=';
    //         const cursor = this.pagination.nextPageUrl.slice(
    //             this.pagination.nextPageUrl.indexOf(pattern) + pattern.length
    //         );
    //         this.pagination.currentPage++; // ✅ Increment page number
    //         await this.fetchCodData(cursor);
    //     }
    // },
    //
    // // ✅ Previous Page
    // async fetchPreviousPage() {
    //     if (this.pagination.prevPageUrl) {
    //         const pattern = 'cursor=';
    //         const cursor = this.pagination.prevPageUrl.slice(
    //             this.pagination.prevPageUrl.indexOf(pattern) + pattern.length
    //         );
    //         this.pagination.currentPage--; // ✅ Decrement page number
    //         await this.fetchCodData(cursor);
    //     }
    // },
  },
});
