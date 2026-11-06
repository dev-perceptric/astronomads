import type { PointKey } from './chart';
import { bodyByKey, isNode, nodeByKey } from './constants';

/** Names, colors and sizes for every point in the chart: planets, nodes, Ascendant and Midheaven. */
export const isAngle = (k: PointKey): k is 'asc' | 'mc' => k === 'asc' || k === 'mc';
export const pointName = (k: PointKey) => (k === 'asc' ? 'Ascendant' : k === 'mc' ? 'Midheaven' : isNode(k) ? nodeByKey(k).name : bodyByKey(k).name);
/** The point's own color: planets and nodes from their tokens, the angles in the text color. */
export const pointColor = (k: PointKey) => (isAngle(k) ? 'var(--foreground)' : isNode(k) ? nodeByKey(k).color : bodyByKey(k).color);
/** Size weight in the wheel: lights read larger, outer planets and nodes smaller. */
export const pointWeight = (k: PointKey) => (isAngle(k) ? 1 : isNode(k) ? nodeByKey(k).weight : bodyByKey(k).weight);
