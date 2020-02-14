export const isValidUrl = (url) => {
  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return re.test(url);
}

export const isValidInt = (value) => {
  var re = /^\d+$/;
  value = value.trim();
  return re.test(value);
}

export const isValidNumber = (value) => {
  var re = /^(\d+)?([.]?\d+)?$/;
  value = value.trim();
  return re.test(value);
}

export const isValidBoolean = (value) => {
  value = value.trim();
  return value === 'true' || value === 'false';
}

export const getValidMoney = (value) => {
  value = value.replace(/[$,]/g, '');
  value = value.trim();
  var re = /^(\d+)?([.]\d*)?$/;
  if (re.test(value) || value === ''){
    return value;
  } else {
    return false;
  }
}

export const formatMoney = (value) => {
  let label;
  if (!value) {
    label = '$ ';
  } else {
    label = `$ ${Number(value).toLocaleString()}`;
  }
  if (value && value.charAt(value.length-1) === '.') {
    label += '.'
  }
  return label;
}

export const validateCampaign = (adSets, ads) => {
  const adsError = [];

  ads.forEach(ad => {
    let errors = validatePresence(ad, 'Basic Info',  ['name', 'product_information', 'start_date', 'end_date', 'format']);
    if (!errors) {
      errors = validatePresence(ad.product_information, 'Product Info', ['category', 'sub_category', 'product_id']);
    }
    if (!errors) {
      errors = validatePresence(ad.format, 'Format Info', ['type', 'data']);
    }
    if (!errors) {
      if (ad.format.type === 'BANNER_FORMAT') {
        errors = validatePresence(ad.format.data, 'Banner Details', ['placements', 'image_for_feed', 'pricing', 'frequency_cap_constraints', 'triggers', 'max_spend']);
      } else if (ad.format.type === 'PRODUCT_OFFER_FORMAT') {
        errors = validatePresence(ad.format.data, 'Product Offer Details', ['placements', 'image_id', 'triggers']);

        if (!errors) {
          ad.format.data.children_formats.forEach(format => {
            if (format.type === 'SCAN_FORMAT') {
              errors = validatePresence(format.data, 'Scan Details', ['pricing', 'scan_codes', 'kick_award_image_id', 'post_scan_image_id', 'max_spend', 'frequency_cap_constraints', 'triggers' ]);
            } else if (format.type === 'PHYSICAL_RECEIPT_PURCHASE_FORMAT') {
              errors = validatePresence(format.data, 'Receipt Details', ['pricing', 'max_spend', 'frequency_cap_constraints', 'triggers']);
            }
          })
        }
      }
    }
    if (errors) {
      adsError.push({...errors, name: ad.name});
    }
  })

  const adSetsError = [];
  adSets.forEach(adSet => {
    let errors = validatePresence2(adSet, 'Basic Info',  ['name', 'locations_filters', 'user_profile_filters']);
    if (errors) {
      adSetsError.push({...errors, name: adSet.name});
    }
  })
  return {
    ads: adsError.length ? adsError : null,
    adSets: adSetsError.length ? adSetsError : null,
  }
}

const validatePresence = (obj, label, arr) => {
  let errors = null;
  arr.forEach(item => { 
    if (!obj[item]) {
      if (!errors) {
        errors = {};
      }
      errors[item] = 'Required';
    }
  });
  if (errors) {
    return {label, errors}
  } else {
    return null;
  }
}

// Duplicate of about function - but check empty array as invalid;
const validatePresence2 = (obj, label, arr) => {
  let errors = null;
  arr.forEach(item => { 
    if (!obj[item] || obj[item].length === 0) {
      if (!errors) {
        errors = {};
      }
      errors[item] = 'Required';
    }
  });
  if (errors) {
    return {label, errors}
  } else {
    return null;
  }
}
