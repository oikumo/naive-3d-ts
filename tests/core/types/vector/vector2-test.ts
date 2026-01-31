import { test, equals, notEquals } from "naive-tests-ts";
import { Vector2 } from '../../../../src/core/types/vector/vector2';

test('vector2 constructor default values', () => {
    const v = new Vector2();
    equals(0, v.x);
    equals(0, v.y);
});

test('vector2 constructor with values', () => {
    const v = new Vector2(5, 10);
    equals(5, v.x);
    equals(10, v.y);
});

test('vector2Left returns (1, 0)', () => {
    const v = Vector2.vector2Left();
    equals(1.0, v.x);
    equals(0.0, v.y);
});

test('vector2Right returns (0, 1)', () => {
    const v = Vector2.vector2Right();
    equals(0.0, v.x);
    equals(1.0, v.y);
});

test('vector2Zero returns (0, 0)', () => {
    const v = Vector2.vector2Zero();
    equals(0, v.x);
    equals(0, v.y);
});

test('vector2AreEquals with equal vectors', () => {
    const v1 = new Vector2(3, 7);
    const v2 = new Vector2(3, 7);
    equals(true, Vector2.vector2AreEquals(v1, v2));
});

test('vector2AreEquals with different vectors', () => {
    const v1 = new Vector2(3, 7);
    const v2 = new Vector2(3, 8);
    equals(false, Vector2.vector2AreEquals(v1, v2));
    
    const v3 = new Vector2(4, 7);
    equals(false, Vector2.vector2AreEquals(v1, v3));
});

test('vector2Translate modifies vector', () => {
    const v = new Vector2(10, 20);
    Vector2.vector2Translate(v, 5, -3);
    equals(15, v.x);
    equals(17, v.y);
});

test('vector2lerp with t=0 returns original vector', () => {
    const v = new Vector2(10, 20);
    const target = new Vector2(30, 40);
    const result = Vector2.vector2lerp(v, target, 0);
    equals(10, result.x);
    equals(20, result.y);
});

test('vector2lerp with t=1 returns target vector', () => {
    const v = new Vector2(10, 20);
    const target = new Vector2(30, 40);
    const result = Vector2.vector2lerp(v, target, 1);
    equals(30, result.x);
    equals(40, result.y);
});

test('vector2lerp with t=0.5 returns midpoint', () => {
    const v = new Vector2(0, 0);
    const target = new Vector2(10, 20);
    const result = Vector2.vector2lerp(v, target, 0.5);
    equals(5, result.x);
    equals(10, result.y);
});

test('vector2lerp with negative values', () => {
    const v = new Vector2(-10, -20);
    const target = new Vector2(10, 20);
    const result = Vector2.vector2lerp(v, target, 0.5);
    equals(0, result.x);
    equals(0, result.y);
});

test('vector2lerp default t=1 returns target', () => {
    const v = new Vector2(10, 20);
    const target = new Vector2(30, 40);
    const result = Vector2.vector2lerp(v, target);
    equals(30, result.x);
    equals(40, result.y);
});

test('vector2Scale modifies vector', () => {
    const v = new Vector2(3, 4);
    Vector2.vector2Scale(v, 2);
    equals(6, v.x);
    equals(8, v.y);
});

test('vector2Scale with factor zero', () => {
    const v = new Vector2(10, 20);
    Vector2.vector2Scale(v, 0);
    equals(0, v.x);
    equals(0, v.y);
});

test('vector2Scale with negative factor', () => {
    const v = new Vector2(3, 4);
    Vector2.vector2Scale(v, -1);
    equals(-3, v.x);
    equals(-4, v.y);
});

test('vector2Sub returns new vector', () => {
    const v1 = new Vector2(10, 15);
    const v2 = new Vector2(3, 7);
    const result = Vector2.vector2Sub(v1, v2);
    equals(7, result.x);
    equals(8, result.y);
    
    // Verify original vectors unchanged
    equals(10, v1.x);
    equals(15, v1.y);
    equals(3, v2.x);
    equals(7, v2.y);
});

test('vector2Sub with same vectors returns zero', () => {
    const v1 = new Vector2(5, 10);
    const v2 = new Vector2(5, 10);
    const result = Vector2.vector2Sub(v1, v2);
    equals(0, result.x);
    equals(0, result.y);
});

test('vector2Distance with same vectors returns zero', () => {
    const v1 = new Vector2(5, 10);
    const v2 = new Vector2(5, 10);
    const distance = Vector2.vector2Distance(v1, v2);
    equals(0, distance);
});

test('vector2Distance horizontal line', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(10, 0);
    const distance = Vector2.vector2Distance(v1, v2);
    equals(10, distance);
});

test('vector2Distance vertical line', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(0, 10);
    const distance = Vector2.vector2Distance(v1, v2);
    equals(10, distance);
});

test('vector2Distance diagonal line (3-4-5 triangle)', () => {
    const v1 = new Vector2(0, 0);
    const v2 = new Vector2(3, 4);
    const distance = Vector2.vector2Distance(v1, v2);
    equals(5, distance);
});

test('vector2Distance with negative coordinates', () => {
    const v1 = new Vector2(-5, -5);
    const v2 = new Vector2(5, 5);
    const distance = Vector2.vector2Distance(v1, v2);
    equals(Math.sqrt(200), distance);
});