import { test, equals, notEquals } from "naive-tests-ts";
import { Point2d } from '../../../src/core/geometry/point2d';
import { Vector2 } from '../../../src/core/types/vector/vector2';
import { Texture } from '../../../src/core/textures/texture';

test('point2d constructor', () => {
    const point = new Point2d(5, 10);
    equals(5, point.x);
    equals(10, point.y);
    equals(5, point.position.x);
    equals(10, point.position.y);
});

test('point2d constructor with negative values', () => {
    const point = new Point2d(-3, -7);
    equals(-3, point.x);
    equals(-7, point.y);
});

test('point2d constructor with zero', () => {
    const point = new Point2d(0, 0);
    equals(0, point.x);
    equals(0, point.y);
});

test('point2d fromVector2', () => {
    const vector = new Vector2(15, 25);
    const point = Point2d.fromVector2(vector);
    equals(15, point.x);
    equals(25, point.y);
    
    // Original vector should be unchanged
    equals(15, vector.x);
    equals(25, vector.y);
});

test('point2d clone', () => {
    const original = new Point2d(8, 12);
    const cloned = Point2d.clone(original);
    
    equals(8, cloned.x);
    equals(12, cloned.y);
    equals(false, original === cloned); // Different instances
    equals(false, original.position === cloned.position); // Different vector instances
});

test('point2d sameX', () => {
    const p1 = new Point2d(5, 10);
    const p2 = new Point2d(5, 20);
    const p3 = new Point2d(6, 10);
    
    equals(true, Point2d.sameX(p1, p2));
    equals(false, Point2d.sameX(p1, p3));
});

test('point2d translate', () => {
    const point = new Point2d(10, 20);
    Point2d.translate(point, 5, -3);
    equals(15, point.x);
    equals(17, point.y);
});

test('point2d floor with positive values', () => {
    const point = new Point2d(3.7, 8.2);
    Point2d.floor(point);
    equals(3, point.x);
    equals(8, point.y);
});

test('point2d floor with negative values', () => {
    const point = new Point2d(-2.3, -5.8);
    Point2d.floor(point);
    equals(-3, point.x);
    equals(-6, point.y);
});

test('point2d scale with positive factor', () => {
    const point = new Point2d(3, 4);
    Point2d.scale(point, 2);
    equals(6, point.x);
    equals(8, point.y);
});

test('point2d scale with zero factor', () => {
    const point = new Point2d(10, 20);
    Point2d.scale(point, 0);
    equals(0, point.x);
    equals(0, point.y);
});

test('point2d scale with negative factor', () => {
    const point = new Point2d(3, 4);
    Point2d.scale(point, -1);
    equals(-3, point.x);
    equals(-4, point.y);
});

test('point2d cloneList with valid array', () => {
    const original = [
        new Point2d(1, 2),
        new Point2d(3, 4),
        new Point2d(5, 6)
    ];
    
    const cloned = Point2d.cloneList(original);
    
    equals(3, cloned.length);
    equals(1, cloned[0].x);
    equals(2, cloned[0].y);
    equals(3, cloned[1].x);
    equals(4, cloned[1].y);
    equals(5, cloned[2].x);
    equals(6, cloned[2].y);
    
    // Verify different instances
    equals(false, original[0] === cloned[0]);
    equals(false, original[1] === cloned[1]);
    equals(false, original[2] === cloned[2]);
});

test('point2d cloneList with empty array', () => {
    const original: Point2d[] = [];
    const cloned = Point2d.cloneList(original);
    equals(0, cloned.length);
});

test('point2d cloneList with null', () => {
    const cloned = Point2d.cloneList(null as any);
    equals(0, cloned.length);
});

test('point2d getPointsOrderedByAsc', () => {
    const points = [
        new Point2d(5, 10),
        new Point2d(2, 8),
        new Point2d(8, 3),
        new Point2d(1, 15)
    ];
    
    const ordered = Point2d.getPointsOrderedByAsc(points);
    
    equals(4, ordered.length);
    equals(1, ordered[0].x);
    equals(2, ordered[1].x);
    equals(5, ordered[2].x);
    equals(8, ordered[3].x);
    
    // Verify Y values are preserved
    equals(15, ordered[0].y);
    equals(8, ordered[1].y);
    equals(10, ordered[2].y);
    equals(3, ordered[3].y);
});

test('point2d delta', () => {
    const p1 = new Point2d(10, 15);
    const p2 = new Point2d(3, 7);
    const delta = Point2d.delta(p1, p2);
    
    equals(7, delta.x);
    equals(8, delta.y);
});

test('point2d distance with same points', () => {
    const p1 = new Point2d(5, 10);
    const p2 = new Point2d(5, 10);
    const distance = Point2d.distance(p1, p2);
    equals(0, distance);
});

test('point2d distance horizontal line', () => {
    const p1 = new Point2d(0, 0);
    const p2 = new Point2d(10, 0);
    const distance = Point2d.distance(p1, p2);
    equals(10, distance);
});

test('point2d distance vertical line', () => {
    const p1 = new Point2d(0, 0);
    const p2 = new Point2d(0, 10);
    const distance = Point2d.distance(p1, p2);
    equals(10, distance);
});

test('point2d distance diagonal (3-4-5 triangle)', () => {
    const p1 = new Point2d(0, 0);
    const p2 = new Point2d(3, 4);
    const distance = Point2d.distance(p1, p2);
    equals(5, distance);
});

test('point2d lerp with t=0', () => {
    const p1 = new Point2d(10, 20);
    const p2 = new Point2d(30, 40);
    const result = Point2d.lerp(p1, p2, 0);
    
    equals(10, result.x);
    equals(20, result.y);
});

test('point2d lerp with t=1', () => {
    const p1 = new Point2d(10, 20);
    const p2 = new Point2d(30, 40);
    const result = Point2d.lerp(p1, p2, 1);
    
    equals(30, result.x);
    equals(40, result.y);
});

test('point2d lerp with t=0.5', () => {
    const p1 = new Point2d(0, 0);
    const p2 = new Point2d(10, 20);
    const result = Point2d.lerp(p1, p2, 0.5);
    
    equals(5, result.x);
    equals(10, result.y);
});

test('point2d equals with equal points', () => {
    const p1 = new Point2d(5, 10);
    const p2 = new Point2d(5, 10);
    equals(true, Point2d.equals(p1, p2));
});

test('point2d equals with different points', () => {
    const p1 = new Point2d(5, 10);
    const p2 = new Point2d(5, 11);
    equals(false, Point2d.equals(p1, p2));
    
    const p3 = new Point2d(6, 10);
    equals(false, Point2d.equals(p1, p3));
});

test('point2d draw with valid coordinates', () => {
    // Create a mock texture for testing
    const mockTexture = {
        width: 10,
        height: 10,
        pixels: new Uint32Array(100)
    } as Texture;
    
    const point = new Point2d(5, 5);
    const color = 0xFF0000FF; // Red
    
    Point2d.draw(mockTexture, point, color);
    
    // Check that the pixel was set at the correct position
    const expectedIndex = Math.floor(5 * 10) + 5; // y * width + x
    equals(color, mockTexture.pixels[expectedIndex]);
});

test('point2d draw with out of bounds coordinates', () => {
    const mockTexture = {
        width: 10,
        height: 10,
        pixels: new Uint32Array(100)
    } as Texture;
    
    const color = 0xFF0000FF; // Red
    
    // Test out of bounds coordinates
    const point1 = new Point2d(-1, 5);
    const point2 = new Point2d(10, 5); // x >= width
    const point3 = new Point2d(5, -1);
    const point4 = new Point2d(5, 10); // y >= height
    
    Point2d.draw(mockTexture, point1, color);
    Point2d.draw(mockTexture, point2, color);
    Point2d.draw(mockTexture, point3, color);
    Point2d.draw(mockTexture, point4, color);
    
    // All pixels should remain 0
    for (let i = 0; i < mockTexture.pixels.length; i++) {
        equals(0, mockTexture.pixels[i]);
    }
});