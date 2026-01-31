import { test, equals } from "naive-tests-ts";
import { Player } from '../../../src/game/scenes/main-scene/player';
import { GameObject } from '../../../src/base/scene/gameobjects/game-object';

test('Player constructor', () => {
    // Since Player extends GameObject and doesn't override constructor,
    // it needs a name parameter
    const player = new Player('Test Player');
    
    equals(true, player instanceof Player);
    equals(true, player instanceof GameObject);
    equals('Test Player', player.name);
    equals(true, player.id !== undefined);
    equals(true, player.id !== '');
    equals(true, typeof player.id === 'string');
});

test('Player constructor with empty name', () => {
    const player = new Player('');
    
    equals(true, player instanceof Player);
    equals(true, player instanceof GameObject);
    equals('', player.name);
    equals(true, player.id !== undefined);
});

test('Player extends GameObject', () => {
    const player = new Player('Test Player');
    
    // Should have GameObject properties
    equals(true, typeof player.awake === 'function');
    equals(true, player.transform !== undefined);
    equals(true, typeof player.transform === 'object');
});

test('Player awake method exists', () => {
    const player = new Player('Test Player');
    
    equals(true, typeof player.awake === 'function');
    
    // Should not throw error when called
    player.awake();
    equals(true, true);
});

test('Player awake method can be called multiple times', () => {
    const player = new Player('Test Player');
    
    // Call awake multiple times
    player.awake();
    player.awake();
    player.awake();
    
    equals(true, true);
});

test('Player with different names', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    const player3 = new Player('');
    const player4 = new Player('Player with special chars: 🎮');
    
    equals('Player 1', player1.name);
    equals('Player 2', player2.name);
    equals('', player3.name);
    equals('Player with special chars: 🎮', player4.name);
    
    // All should have unique IDs
    equals(false, player1.id === player2.id);
    equals(false, player2.id === player3.id);
    equals(false, player3.id === player4.id);
});

test('Player ID generation', () => {
    const players: Player[] = [];
    
    // Create multiple players
    for (let i = 0; i < 10; i++) {
        players.push(new Player(`Player ${i}`));
    }
    
    // All should have unique IDs
    const ids = players.map(p => p.id);
    const uniqueIds = [...new Set(ids)];
    
    equals(players.length, uniqueIds.length);
    
    // All IDs should be valid UUID strings
    for (const player of players) {
        equals(true, typeof player.id === 'string');
        equals(true, player.id.length > 0);
    }
});

test('Player transform is initialized', () => {
    const player = new Player('Test Player');
    
    equals(true, player.transform !== undefined);
    equals(true, player.transform !== null);
    equals(true, typeof player.transform === 'object');
});

test('Player multiple instances', () => {
    const players = [
        new Player('Player 1'),
        new Player('Player 2'),
        new Player('Player 3')
    ];
    
    // All should be Player instances
    for (const player of players) {
        equals(true, player instanceof Player);
        equals(true, player instanceof GameObject);
    }
    
    // All should have unique properties
    equals(players[0].name, 'Player 1');
    equals(players[1].name, 'Player 2');
    equals(players[2].name, 'Player 3');
});

test('Player awake method extensibility', () => {
    // Test that awake method can be overridden if needed
    class CustomPlayer extends Player {
        awakeCalled = false;
        
        override awake(): void {
            super.awake();
            this.awakeCalled = true;
        }
    }
    
    const customPlayer = new CustomPlayer('Custom Player');
    customPlayer.awake();
    
    equals(true, customPlayer.awakeCalled);
});

test('Player complete lifecycle simulation', () => {
    const player = new Player('Lifecycle Player');
    
    // Simulate player lifecycle
    player.awake();
    
    // Test that player remains functional
    equals(true, player instanceof Player);
    equals('Lifecycle Player', player.name);
    equals(true, player.transform !== undefined);
    
    // Multiple awake calls (simulating restart scenarios)
    player.awake();
    player.awake();
    
    equals(true, true);
});