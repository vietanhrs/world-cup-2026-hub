import { SegmentedControl, SimpleGrid, Title } from '@mantine/core';
import { groupMatches, knockoutMatches } from '../data/schedule';
import { groupKeys } from '../data/groups';
import { MatchCard } from './MatchCard';
import type { Prediction, Team } from '../types';

type PredictPanelProps = {
  activeGroup: string;
  predictions: Prediction;
  resolver: (ref: string) => Team | string;
  onActiveGroupChange: (group: string) => void;
  onScore: (id: string, side: 'home' | 'away', value: number | string | null) => void;
  onRoster: (team: Team) => void;
};

export function PredictPanel({ activeGroup, predictions, resolver, onActiveGroupChange, onScore, onRoster }: PredictPanelProps) {
  return (
    <>
      <SegmentedControl
        value={activeGroup}
        onChange={onActiveGroupChange}
        data={groupKeys.map((group) => ({
          label: `Bảng ${group}`,
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
              variant="group"
            />
          ))}
      </div>
      <Title order={3} mt="xl" mb="md">
        Playoff / Knockout
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
            variant="knockout"
          />
        ))}
      </SimpleGrid>
    </>
  );
}
