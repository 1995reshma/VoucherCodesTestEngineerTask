const acceptCookiePopUp = async (page) => {
  const button = await page.locator('button#onetrust-accept-btn-handler');
  await button.waitFor()
  if (await button.isVisible()) {
    await button.click();
  }
};

export default acceptCookiePopUp;
