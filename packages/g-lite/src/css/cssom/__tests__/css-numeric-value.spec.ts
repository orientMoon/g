import { expect } from 'chai';
import { BaseType, CSSNumericValueType, CSSUnitValue, UnitType } from '../';

describe('CSSNumericValueType', () => {
  it('should return correct type', () => {
    // default type
    const number = new CSSUnitValue(10);
    expect(number.type()).to.eqls({
      length: 0,
      angle: 0,
      time: 0,
      frequency: 0,
      resolution: 0,
      flex: 0,
      percent: 0,
      percentHint: 'length',
    });

    // length
    const length = new CSSUnitValue(10, 'px');
    expect(length.type()).to.eqls({
      length: 1,
      angle: 0,
      time: 0,
      frequency: 0,
      resolution: 0,
      flex: 0,
      percent: 0,
      percentHint: 'length',
    });

    // angle
    const angle = new CSSUnitValue(10, 'deg');
    expect(angle.type()).to.eqls({
      length: 0,
      angle: 1,
      time: 0,
      frequency: 0,
      resolution: 0,
      flex: 0,
      percent: 0,
      percentHint: 'length',
    });

    // percent
    const percent = new CSSUnitValue(10, '%');
    expect(percent.type()).to.eqls({
      length: 0,
      angle: 0,
      time: 0,
      frequency: 0,
      resolution: 0,
      flex: 0,
      percent: 1,
      percentHint: 'length',
    });

    // 10% + 10px
    const result = percent.add(length);
    expect(result.type()).to.eqls({
      length: 1,
      angle: 0,
      time: 0,
      frequency: 0,
      resolution: 0,
      flex: 0,
      percent: 0,
      percentHint: 'length',
    });
  });

  it('should toSum()', () => {
    const length = new CSSUnitValue(10, 'px');
    const percent = new CSSUnitValue(10, '%');
    const result = percent.add(length);

    expect(result.toString()).to.be.eqls('calc(10% + 10px)');
    expect(result.toSum('px', 'percent').toString()).to.be.eqls('calc(10px + 10%)');
    expect(result.toSum('percent', 'px').toString()).to.be.eqls('calc(10% + 10px)');

    expect(() => {
      result.toSum('px');
    }).to.throw('There were leftover terms that were not converted');
  });

  it('ApplyingPercentHintMovesPowerAndSetsPercentHint', () => {
    const type = new CSSNumericValueType(UnitType.kPixels);

    type.setExponent(BaseType.kPercent, 5);
    expect(type.exponent(BaseType.kPercent)).to.eqls(5);
    expect(type.exponent(BaseType.kLength)).to.eqls(1);
    expect(type.hasPercentHint).to.be.false;

    type.applyPercentHint(BaseType.kLength);
    expect(type.exponent(BaseType.kPercent)).to.eqls(0);
    expect(type.exponent(BaseType.kLength)).to.eqls(6);

    expect(type.hasPercentHint).to.be.true;
    expect(type.percentHint).to.eqls(BaseType.kLength);
  });

  it('MatchesBaseTypePercentage', () => {
    const type = new CSSNumericValueType();

    expect(type.matchesBaseType(BaseType.kLength)).to.be.false;
    expect(type.matchesBaseTypePercentage(BaseType.kLength)).to.be.false;

    type.setExponent(BaseType.kLength, 1);
    expect(type.matchesBaseType(BaseType.kLength)).to.be.true;
    expect(type.matchesBaseTypePercentage(BaseType.kLength)).to.be.true;

    type.setExponent(BaseType.kLength, 2);
    expect(type.matchesBaseType(BaseType.kLength)).to.be.false;
    expect(type.matchesBaseTypePercentage(BaseType.kLength)).to.be.false;

    type.setExponent(BaseType.kLength, 1);
    expect(type.matchesBaseType(BaseType.kLength)).to.be.true;
    expect(type.matchesBaseTypePercentage(BaseType.kLength)).to.be.true;

    type.applyPercentHint(BaseType.kLength);
    expect(type.matchesBaseType(BaseType.kLength)).to.be.false;
    expect(type.matchesBaseTypePercentage(BaseType.kLength)).to.be.true;
  });

  it('MatchesPercentage', () => {
    const type = new CSSNumericValueType();
    expect(type.matchesPercentage()).to.be.false;

    type.setExponent(BaseType.kPercent, 1);
    expect(type.matchesPercentage()).to.be.true;

    type.setExponent(BaseType.kPercent, 2);
    expect(type.matchesPercentage()).to.be.false;

    type.applyPercentHint(BaseType.kLength);
    expect(type.matchesPercentage()).to.be.false;

    type.setExponent(BaseType.kLength, 0);
    type.setExponent(BaseType.kPercent, 1);
    expect(type.matchesPercentage()).to.be.true;
  });

  it('MatchesNumberPercentage', () => {
    const type = new CSSNumericValueType();
    expect(type.matchesNumber()).to.be.true;
    expect(type.matchesNumberPercentage()).to.be.true;

    type.setExponent(BaseType.kLength, 1);
    expect(type.matchesNumber()).to.be.false;
    expect(type.matchesNumberPercentage()).to.be.false;

    type.setExponent(BaseType.kLength, 0);
    expect(type.matchesNumber()).to.be.true;
    expect(type.matchesNumberPercentage()).to.be.true;

    type.setExponent(BaseType.kPercent, 1);
    expect(type.matchesNumber()).to.be.false;
    expect(type.matchesNumberPercentage()).to.be.true;
  });
});
