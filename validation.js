function validateGiftInput(occasion, budget) {
    if (!occasion) return false;
    if (budget <= 0) return false;
    return true;
}
