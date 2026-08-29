(function () {
  'use strict';

  // Phase 1 now uses the native CRM Note composer and CRM Note persistence
  // bridge. Keep this small marker so review builds can identify the increment
  // without rewriting or hiding any of the composer DOM at runtime.
  window.WeQuoteCrmNoteAttentionPhase1 = Object.freeze({
    version: 4,
    sourceRecord: 'chosen-platform-record',
    sourceModel: 'platform-note',
    actionableRule: 'follow-up-required-mention-optional',
    launchScope: 'global-record-picker'
  });
}());
