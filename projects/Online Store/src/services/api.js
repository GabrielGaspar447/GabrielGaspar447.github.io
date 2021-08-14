const failedFetch = 'Failed to fetch information';

export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(failedFetch);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(failedFetch);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(productId) {
  try {
    const url = `https://api.mercadolibre.com/items/${productId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(failedFetch);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getProductDescription(productId) {
  try {
    const url = `https://api.mercadolibre.com/items/${productId}/description`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(failedFetch);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}
