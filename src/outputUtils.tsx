import { ICodeCellModel } from '@jupyterlab/cells';
import { IBaseCellMetadata } from '@jupyterlab/nbformat';
import { Key } from 'react';
import { PinnedOutput } from './pinned-outputs';

const tabsKey = 'pinned_outputs';
const tabIndexKey = 'pinnedOutputTabIndex';

/**
 * 指定した個数を残して古い出力を削除する
 * @param metadata
 * @param rest 残す個数
 */
export function leaveLatestPinnedOutputs(
  codeCell: ICodeCellModel,
  rest: number
): void {
  const outputs = getPinnedOutputs(codeCell.metadata);
  setPinnedOutputs(codeCell, latest(rest, outputs));
}

export function getPinnedOutputs(metadata: Pick<IBaseCellMetadata, Key>): PinnedOutput[] {
  console.log('METADATA', metadata);
  return (metadata[tabsKey] || []) as PinnedOutput[];
}

export function setPinnedOutputs(
  codeCell: ICodeCellModel,
  outputs: PinnedOutput[]
): void {
  codeCell.setMetadata(tabsKey, outputs);
}

function latest<T>(n: number, items: T[]): T[] {
  return items.splice(-n);
}

export function resetPinnedOutputs(codeCell: ICodeCellModel): void {
  codeCell.deleteMetadata(tabsKey);
}

export function getOutputTabIndex(metadata: Pick<IBaseCellMetadata, Key>): number {
  return Number(metadata[tabIndexKey] || 0);
}

export function setOutputTabIndex(
  metadata: Pick<IBaseCellMetadata, Key>,
  value: number
): void {
  metadata[tabIndexKey] = value;
}

export function selectCurrentOutputTab(metadata: Pick<IBaseCellMetadata, Key>): void {
  setOutputTabIndex(metadata, 0);
}

export function selectLatestOutputTab(metadata: Pick<IBaseCellMetadata, Key>): void {
  setOutputTabIndex(metadata, 1);
}
