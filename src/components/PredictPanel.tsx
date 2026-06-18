import { SegmentedControl, SimpleGrid, Title } from '@mantine/core';
import { groupKeys } from '../data/groups';
import { useI18n } from '../i18n';
import { MatchCard } from './MatchCard';
import type { Match, Prediction, Team } from '../types';

type PredictPanelProps = {
  activeGroup: string;
  groupMatches: Match[];
  knockoutMatches: Match[];
  predictions: Prediction;
  resolver: (ref: string) => Team | string;
  onActiveGroupChange: (group: string) => void;
  onScore: (id: string, side: 'home' | 'away', value: number | string | null) => void;
  onRoster: (team: Team) => void;
  onDetails: (match: Match) => void;
};

export function PredictPanel({
  activeGroup,
  groupMatches,
  knockoutMatches,
  predictions,
  resolver,
  onActiveGroupChange,
  onScore,
  onRoster,
  onDetails,
}: PredictPanelProps) {
  const { t } = useI18n();

  return (
    <>
      <SegmentedControl
        value={activeGroup}
        onChange={onActiveGroupChange}
        data={groupKeys.map((group) => ({
          label: t('common.group', { group }),
          value: group,
        }))}
        className="group-switch"
      />
      <div className="group-match-grid">
        {groupMatches
          .filter((match) => match.group === activeGroup)
          .map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              prediction={predictions[match.id]}
              resolver={resolver}
              onScore={onScore}
              onRoster={onRoster}
              onDetails={onDetails}
              variant="group"
            />
          ))}
      </div>
      <Title order={3} mt="xl" mb="md">
        {t('predict.knockout')}
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
        {knockoutMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            prediction={predictions[match.id]}
            resolver={resolver}
            onScore={onScore}
            onRoster={onRoster}
            onDetails={onDetails}
            variant="knockout"
          />
        ))}
      </SimpleGrid>
    </>
  );
}
