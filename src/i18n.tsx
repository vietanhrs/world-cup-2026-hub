/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Match, RosterRole } from './types';

export type Language = 'en-US' | 'vi-VN';

type TranslationKey =
  | 'app.subtitle'
  | 'common.cancel'
  | 'common.clearAll'
  | 'common.group'
  | 'common.source'
  | 'header.theme.dark'
  | 'header.theme.light'
  | 'header.theme.system'
  | 'header.share'
  | 'header.clear'
  | 'music.noTracks'
  | 'music.previous'
  | 'music.pause'
  | 'music.play'
  | 'music.stop'
  | 'music.next'
  | 'music.repeatAll'
  | 'music.repeatOne'
  | 'music.shuffleOff'
  | 'music.shuffleOn'
  | 'hero.badge'
  | 'hero.title'
  | 'hero.description'
  | 'hero.progress'
  | 'hero.champion'
  | 'tabs.predict'
  | 'tabs.results'
  | 'predict.knockout'
  | 'results.groupComplete'
  | 'results.groupInProgress'
  | 'results.team'
  | 'results.points'
  | 'results.played'
  | 'results.goalDifference'
  | 'results.bracket'
  | 'modal.clearTitle'
  | 'modal.clearDescription'
  | 'roster.title'
  | 'roster.currentSquad'
  | 'roster.bestXi'
  | 'notify.noMusicTitle'
  | 'notify.noMusicMessage'
  | 'notify.musicErrorTitle'
  | 'notify.musicErrorMessage'
  | 'notify.shareTitle'
  | 'notify.shareMessage'
  | 'notify.clearTitle'
  | 'notify.clearMessage'
  | 'resolver.winner'
  | 'resolver.loser'
  | 'resolver.third'
  | 'resolver.groupWinner'
  | 'resolver.groupRunnerUp';

const languageStorageKey = 'world-cup-2026-hub-language';

const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  'en-US': {
    'app.subtitle': 'Group table · knockout bracket · roster board',
    'common.cancel': 'Cancel',
    'common.clearAll': 'Clear all',
    'common.group': 'Group {group}',
    'common.source': 'Source: Wikipedia current squad',
    'header.theme.dark': 'Dark',
    'header.theme.light': 'Light',
    'header.theme.system': 'System',
    'header.share': 'Share prediction',
    'header.clear': 'Clear all predictions',
    'music.noTracks': 'No media tracks',
    'music.previous': 'Previous track',
    'music.pause': 'Pause',
    'music.play': 'Start / Resume',
    'music.stop': 'Stop',
    'music.next': 'Next track',
    'music.repeatAll': 'Repeat all',
    'music.repeatOne': 'Repeat one',
    'music.shuffleOff': 'Shuffle off',
    'music.shuffleOn': 'Shuffle on',
    'hero.badge': 'World Cup 2026 · three-host edition',
    'hero.title': 'Predict scores, track tables, and build your champion path.',
    'hero.description':
      'Fill in each match, revise anytime, and preview group-stage or playoff outcomes even while predictions are still incomplete.',
    'hero.progress': 'Prediction progress',
    'hero.champion': 'Vô địch',
    'tabs.predict': 'Enter scores',
    'tabs.results': 'Prediction results',
    'predict.knockout': 'Playoff / Knockout',
    'results.groupComplete': 'Complete',
    'results.groupInProgress': 'Predicting',
    'results.team': 'Team',
    'results.points': 'Pts',
    'results.played': 'P',
    'results.goalDifference': 'GD',
    'results.bracket': 'Playoff bracket',
    'modal.clearTitle': 'Clear all predictions?',
    'modal.clearDescription': 'All scores currently entered on this screen will be removed.',
    'roster.title': '{team} roster',
    'roster.currentSquad': 'Current squad · fetched {date}',
    'roster.bestXi': 'Projected strongest XI',
    'notify.noMusicTitle': 'No music tracks',
    'notify.noMusicMessage': 'No music files were found in /media.',
    'notify.musicErrorTitle': 'Could not play music',
    'notify.musicErrorMessage': 'Could not open {src}.',
    'notify.shareTitle': 'Share link copied',
    'notify.shareMessage': 'Anyone opening the link will see the current prediction.',
    'notify.clearTitle': 'Prediction cleared',
    'notify.clearMessage': 'All scores have been reset.',
    'resolver.winner': 'Winner of {match}',
    'resolver.loser': 'Loser of {match}',
    'resolver.third': 'Third-place team ({groups})',
    'resolver.groupWinner': 'Group {group} winner',
    'resolver.groupRunnerUp': 'Group {group} runner-up',
  },
  'vi-VN': {
    'app.subtitle': 'Bảng điểm · nhánh playoff · đội hình',
    'common.cancel': 'Hủy',
    'common.clearAll': 'Xóa hết',
    'common.group': 'Bảng {group}',
    'common.source': 'Nguồn: Wikipedia current squad',
    'header.theme.dark': 'Tối',
    'header.theme.light': 'Sáng',
    'header.theme.system': 'Hệ thống',
    'header.share': 'Chia sẻ prediction',
    'header.clear': 'Xóa toàn bộ prediction',
    'music.noTracks': 'Chưa có track nhạc',
    'music.previous': 'Track trước',
    'music.pause': 'Tạm dừng',
    'music.play': 'Phát / tiếp tục',
    'music.stop': 'Dừng',
    'music.next': 'Track sau',
    'music.repeatAll': 'Lặp tất cả',
    'music.repeatOne': 'Lặp một bài',
    'music.shuffleOff': 'Shuffle tắt',
    'music.shuffleOn': 'Shuffle bật',
    'hero.badge': 'World Cup 2026 · ba nước chủ nhà',
    'hero.title': 'Dự đoán tỉ số, xem bảng điểm và tự dựng nhánh vô địch.',
    'hero.description':
      'Điền dần từng trận, chỉnh lại bất cứ lúc nào, xem kết quả group stage hoặc playoff ngay cả khi prediction còn dang dở.',
    'hero.progress': 'Tiến độ prediction',
    'hero.champion': 'Champion',
    'tabs.predict': 'Điền tỉ số',
    'tabs.results': 'Kết quả prediction',
    'predict.knockout': 'Playoff / Knockout',
    'results.groupComplete': 'Đủ trận',
    'results.groupInProgress': 'Đang dự đoán',
    'results.team': 'Đội',
    'results.points': 'Điểm',
    'results.played': 'Trận',
    'results.goalDifference': 'HS',
    'results.bracket': 'Nhánh playoff',
    'modal.clearTitle': 'Xóa toàn bộ prediction?',
    'modal.clearDescription': 'Tất cả tỉ số đang điền sẽ bị xóa khỏi màn hình hiện tại.',
    'roster.title': '{team} roster',
    'roster.currentSquad': 'Đội hình hiện tại · cập nhật {date}',
    'roster.bestXi': 'Đội hình mạnh nhất dự kiến',
    'notify.noMusicTitle': 'Không có track nhạc',
    'notify.noMusicMessage': 'Chưa tìm thấy file nhạc trong thư mục /media.',
    'notify.musicErrorTitle': 'Không phát được nhạc',
    'notify.musicErrorMessage': 'Không mở được {src}.',
    'notify.shareTitle': 'Đã copy link share',
    'notify.shareMessage': 'Người khác mở link sẽ thấy prediction hiện tại.',
    'notify.clearTitle': 'Đã xóa prediction',
    'notify.clearMessage': 'Tất cả tỉ số đã được đưa về trống.',
    'resolver.winner': 'Thắng {match}',
    'resolver.loser': 'Thua {match}',
    'resolver.third': 'Đội hạng ba ({groups})',
    'resolver.groupWinner': 'Nhất bảng {group}',
    'resolver.groupRunnerUp': 'Nhì bảng {group}',
  },
};

const roleLabels: Record<Language, Record<RosterRole, string>> = {
  'en-US': {
    'Thủ môn': 'Goalkeepers',
    'Hậu vệ': 'Defenders',
    'Tiền vệ': 'Midfielders',
    'Tiền đạo': 'Forwards',
  },
  'vi-VN': {
    'Thủ môn': 'Thủ môn',
    'Hậu vệ': 'Hậu vệ',
    'Tiền vệ': 'Tiền vệ',
    'Tiền đạo': 'Tiền đạo',
  },
};

const stageLabels: Record<Language, Record<Match['stage'], string>> = {
  'en-US': {
    group: 'Match',
    r32: 'Round of 32',
    r16: 'Round of 16',
    qf: 'Quarter-final',
    sf: 'Semi-final',
    bronze: 'Third-place match',
    final: 'Final',
  },
  'vi-VN': {
    group: 'Trận',
    r32: 'Vòng 32',
    r16: 'Vòng 16',
    qf: 'Tứ kết',
    sf: 'Bán kết',
    bronze: 'Tranh hạng ba',
    final: 'Chung kết',
  },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
  matchLabel: (match: Match) => string;
  rosterRoleLabel: (role: RosterRole) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === 'en-US' || value === 'vi-VN';
}

function interpolate(message: string, values: Record<string, string | number> = {}) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), message);
}

function matchOrdinal(match: Match) {
  const number = match.id.split('-').at(-1);
  return number && /^\d+$/.test(number) ? number : '';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en-US';
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    return isLanguage(savedLanguage) ? savedLanguage : 'en-US';
  });

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language, setLanguage]);

  const value = useMemo<I18nContextValue>(() => {
    const t: I18nContextValue['t'] = (key, values) => interpolate(dictionaries[language][key], values);

    return {
      language,
      setLanguage,
      t,
      matchLabel: (match) => {
        const ordinal = matchOrdinal(match);
        if (match.stage === 'bronze' || match.stage === 'final') return stageLabels[language][match.stage];
        return ordinal ? `${stageLabels[language][match.stage]} ${ordinal}` : match.label;
      },
      rosterRoleLabel: (role) => roleLabels[language][role],
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
