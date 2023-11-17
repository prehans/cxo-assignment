class Bucket {
    constructor(name, volume) {
        this.name = name;
        this.volume = volume;
        this.emptyVolume = volume;
    }
}

class Ball {
    constructor(color, volume) {
        this.color = color;
        this.volume = volume;
    }
}

class BucketSystem {
    constructor(buckets, balls) {
        this.buckets = buckets;
        this.balls = balls;
    }

    suggestPlacement(color, quantity) {
        for (let bucket of this.buckets) {
            if (bucket.emptyVolume >= quantity) {
                const placedBalls = this.placeBallsInBucket(bucket, color, quantity);
                console.log(`${bucket.name}: Place ${placedBalls.length} ${color} balls.`);
                bucket.emptyVolume -= placedBalls.reduce((totalVolume, ball) => totalVolume + ball.volume, 0);
                return;
            }
        }

        console.log("No suitable bucket found for the placement.");
    }

    placeBallsInBucket(bucket, color, quantity) {
        const placedBalls = [];
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            if (ball.color === color) {
                placedBalls.push(ball);
                quantity -= 1;
                if (quantity === 0) {
                    break;
                }
            }
        }
        placedBalls.forEach(ball => {
            const index = this.balls.indexOf(ball);
            if (index !== -1) {
                this.balls.splice(index, 1);
            }
        });

        return placedBalls;
    }
}
function createBucket(name, volume) {
    return new Bucket(name, volume);
}

function createBall(color, volume) {
    return new Ball(color, volume);
}

function createBucketSystem(buckets, balls) {
    return new BucketSystem(buckets, balls);
}
const buckets = [createBucket("Bucket A", 100), createBucket("Bucket B", 150)];
const balls = [
    createBall("Pink", 5),
    createBall("Red", 7),
    createBall("Blue", 8),
    createBall("Orange", 6),
    createBall("Green", 10),
];

const system = createBucketSystem(buckets, balls);
system.suggestPlacement("Blue", 20);
system.suggestPlacement("Yellow", 10);
system.suggestPlacement("Pink", 15);
system.suggestPlacement("Green", 12);
system.suggestPlacement("Red", 5);
console.log("\nCurrent State:");
for (let bucket of system.buckets) {
    console.log(`${bucket.name}: Empty Volume - ${bucket.emptyVolume} cubic inches`);
}

console.log("\nRemaining Balls:");
for (let ball of system.balls) {
    console.log(`${ball.color} Ball: Volume - ${ball.volume} cubic inches`);
}
