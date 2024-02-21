const ADMIN_ROLE = 'admin';
const DEFAULT_COMMENT = 'Removed by moderator';
const USER_BG_COLORS = ['#405F71', '#563E70', '#733F55', '#121d80', '#a06969', '#427735', '#77355c', '#4c52a0', '#788338', '#388379'];
const DEFAULT_PAGINATION_ITEMS_LIMIT = 12;
const NO_IMAGE = 'data:image/png;base64,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'
const USER_AVATAR = 'data:image/png;base64,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';

export {
  ADMIN_ROLE,
  DEFAULT_COMMENT,
  DEFAULT_PAGINATION_ITEMS_LIMIT,
  USER_AVATAR,
  NO_IMAGE,
  USER_BG_COLORS,
}
