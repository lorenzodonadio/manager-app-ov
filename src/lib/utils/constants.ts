// Replenishment: (Default)
//     Description: Stock is added to the inventory, usually from a main warehouse or supplier.
//     Use: When the manager provides the entrepreneur with more items.
// Sale: (IMPLEMENTED IN SALES)
//     Description: Items are sold to end customers.
//     Use: When the entrepreneur sells items to customers.
// Return: (negative quantity)
//     Description: Items are returned to the inventory, usually due to them being unsold or returned by the end customer.
//     Use: When unsold items are given back by the entrepreneur or if an end customer returns a purchase.
// Adjustment: (implemented here, there should be some limits)
//     Description: Corrections made to the inventory count due to reasons like damaged goods, theft, or counting errors.
//     Use: When items are found missing or extra items are found during a stock count.
// Transfer: (To be implemented)
//     Description: Items are moved from one location to another or from one entrepreneur to another.
//     Use: If one entrepreneur hands over stock to another entrepreneur.
import countryToCurrency from 'country-to-currency';
// import getSymbolFromCurrency from 'currency-symbol-map';

export const ITEMS = ['FILTER', 'CARTRIDGE'];

export const SUPPLY_TRANSACTION_TYPES = ['REPLENISHMENT', 'RETURN', 'ADJUSTMENT'];

export const DEFAULT_COUNTRY = 'CO';
export const DEFAULT_CURRENCY = 'COP';
export const POSSIBLE_QTY = [10, 20, 30, 40];
// Mapping of suggested prices based on currency codes.
export const SUGGESTED_PRICE = {
	COP: 195000,
	USD: 45
};

/**
 * Converts a given country code to its corresponding currency code.
 * Returns a default currency code and a warning flag if the country code is invalid or not found.
 *
 * @param {string | null | undefined} countryCode - The alpha-2 country code to be converted.
 * @returns {Object} An object containing the currency code and a warning flag.
 */
export const countryToCurrencyCode = (countryCode: string | null | undefined) => {
	if (!countryCode) return { currency: DEFAULT_CURRENCY, warning: true }; // Guard clause for missing or null country code
	const currency: string = countryToCurrency[countryCode]; // Convert country code to currency code
	if (currency) return { currency, warning: false };
	return { currency: DEFAULT_CURRENCY, warning: true }; // Default case for unmatched country code
};

// Default response for unsupported or undefined country codes.
const _defResponse = {
	price: SUGGESTED_PRICE[DEFAULT_CURRENCY],
	currency: DEFAULT_CURRENCY,
	warning: true
};

/**
 * Retrieves the suggested price for a given country code.
 * Returns a default price and currency code along with a warning flag if the country code is invalid or not found.
 *
 * @param {string | null | undefined} countryCode - The alpha-2 country code for which the price is to be retrieved.
 * @returns {Object} An object containing the suggested price, currency code, and a warning flag.
 */
export const getSuggestedPrice = (countryCode: string | null | undefined) => {
	if (!countryCode) return _defResponse; // Guard clause for missing or null country code
	const { currency, warning } = countryToCurrencyCode(countryCode); // Retrieve currency code
	const price: number = SUGGESTED_PRICE[currency]; // Retrieve price for currency code
	if (price) return { price, currency, warning };
	return _defResponse; // Default case for unmatched country code
};
