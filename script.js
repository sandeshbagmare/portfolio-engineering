const filters = [...document.querySelectorAll(".filters button")],
  cards = [...document.querySelectorAll(".projects article")];
filters.forEach((btn) => {
  btn.setAttribute("aria-pressed", btn.classList.contains("active"));
  btn.addEventListener("click", () => {
    filters.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const f = btn.dataset.filter;
    cards.forEach((c) => (c.hidden = f !== "all" && c.dataset.cat !== f));
    document.getElementById("filter-status").textContent =
      cards.filter((c) => !c.hidden).length + " projects shown";
  });
});
const data = [
  [
    "AGENT > UPSTREAM TOOL",
    "A useful tool still needs real context.",
    "The agent calls a tool through its familiar name and schema. Raw output stays on the gateway side.",
    "tool: get_customer_schema\ninput: { table: customers }\nroute: agent > gateway > tool",
  ],
  [
    "GATEWAY PROCESS",
    "Transform before it travels.",
    "The gateway receives the complete response, then reconstructs a structural description. This is an illustrative example using synthetic data.",
    "raw: { customer_id: 42 }\npolicy: schema_only\noutput: { fields, synthetic_values }",
  ],
  [
    "AGENT CONTEXT",
    "Expose shape, withhold values.",
    "The agent receives structure without observed values by default. Stable field names remain visible; upstream authorization still matters.",
    "agent sees: { fields, types }\nagent does not see: { rows, observed_values }",
  ],
];
document.querySelectorAll(".step").forEach((btn) => {
  btn.setAttribute("aria-pressed", btn.classList.contains("active"));
  btn.addEventListener("click", () => {
    document.querySelectorAll(".step").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const d = data[+btn.dataset.step];
    ["step-label", "step-title", "step-text", "step-code"].forEach(
      (id, i) => (document.getElementById(id).textContent = d[i]),
    );
  });
});
