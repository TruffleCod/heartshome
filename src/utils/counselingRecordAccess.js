import { hashWithPepper, normalizeInput } from './hash';

const RECORD_CODE_PEPPER = 'heart_home_record_key_v1::';

const SHARED_PRIVATE_RECORDS = {
  '5bbec09980046b1ebd6c3d7c69967350b0ef0de396a45b666b8b676d0a70aca8':
    '/p/e47a92c0d1',
  '80b9462d494619151bdb37e034c3438642309ccee32ee3ac48a069dc40e91e29':
    '/p/0f6b83d2a7',
  '0d6ba888e22ac8a6ad02b8c71a6e1b1e3f7b528ff355b0e0dcbaa239880e9e3d':
    '/p/c5a18f0e9d',
};

const RECORDS_BY_ACCOUNT = {
  lonelyClover: SHARED_PRIVATE_RECORDS,
  gardener338: SHARED_PRIVATE_RECORDS,
  buxiang: {},
};

export function normalizeRecordCodeInput(value) {
  return normalizeInput(value).toUpperCase();
}

export async function getCounselingRecordPathForAccount(accountKey, recordCode) {
  const normalized = normalizeRecordCodeInput(recordCode);
  if (!normalized) {
    return '';
  }

  const hash = await hashWithPepper(normalized, RECORD_CODE_PEPPER);
  return RECORDS_BY_ACCOUNT[accountKey]?.[hash] || '';
}
