new Vue({
  el: "#app",
  data() {
    return {
      form: {
        value_1: "",
        value_3: "",
        value_7: "",
      },
      tasks_1: [],
      tasks_3: [],
      tasks_7: [],
    };
  },
  methods: {
    async createDay_1() {
      const { ...value_1 } = this.form;
      const newTak = await request("/api/tasks", "POST", value_1);
      this.tasks_1.push(newTak);
      this.form.value_1 = "";
    },
    async createDay_3() {
      const { ...value_3 } = this.form;
      const newTak = await request("/api/tasks", "POST", value_3);
      this.tasks_3.push(newTak);
      this.form.value_3 = "";
    },
    async createDay_7() {
      const { ...value_7 } = this.form;
      const newTak = await request("/api/tasks", "POST", value_7);
      this.tasks_7.push(newTak);
      this.form.value_7 = "";
    },
    async removeDay_1(id) {
      await request(`/api/tasks/${id}`, "DELETE");
      this.tasks_1 = this.tasks_1.filter((c) => c.id !== id);
    },
  },
  async mounted() {
    this.tasks_1 = await request("/api/tasks");
  },
});

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn("Error", e.message);
  }
}
