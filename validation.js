function validateGiftInput(occasion, budget) {
    if (!occasion) return false;
    if (budget <= 0) return false;
    if (typeof budget !== "number") return false;
    return true;
}
