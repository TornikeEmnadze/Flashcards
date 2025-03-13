import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from '../src/flashcards';
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
} from "../src/algorithm";
import { flashcards5 } from "./utils/flashcards5";

/*
 * Testing strategy for toBucketSets():
 *
 * TODO: Describe your testing strategy for toBucketSets() here.
 */
describe("toBucketSets()", () => {
  it("Simple bucket", () => {

   const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    
    const buckets:Array<Set<Flashcard>> = [
      new Set([flashcard1, flashcard2]),
      new Set([flashcard3]),
      new Set([flashcard4, flashcard5])
    ];

    const bucketMap1: BucketMap = new Map([
      [0, new Set([flashcard1, flashcard2])],
      [1, new Set([flashcard3])],
      [2, new Set([flashcard4, flashcard5])],
    ]);

    assert.deepStrictEqual(toBucketSets(bucketMap1),buckets);
  });

  it("all flashcards in one bucket",()=>{
    
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    const buckets:Array<Set<Flashcard>> = [
      new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])
    ];
    

    const bucketMap3: BucketMap = new Map([
      [0, new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])],
    ]);

    assert.deepStrictEqual(toBucketSets(bucketMap3),buckets);
  })
  it("Empty bucket among filled buckets",()=>{
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    const buckets:Array<Set<Flashcard>> = [
      new Set([]),
      new Set([]),
      new Set([flashcard1,flashcard2,flashcard4]),
      new Set([flashcard3,flashcard5])
    ];

    const bucketMap4: BucketMap = new Map([
      [0, new Set([])],
      [1, new Set([])],
      [2, new Set([flashcard1,flashcard2,flashcard4])],
      [3, new Set([flashcard3, flashcard5])],
    ]);

    assert.deepStrictEqual(toBucketSets(bucketMap4),buckets);
  })
});

/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
  it("Simple Bucket", () => {
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }
    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    const bucketMap1: BucketMap = new Map([
      [0, new Set([flashcard1, flashcard2])],
      [1, new Set([flashcard3])],
      [2, new Set([flashcard4, flashcard5])],
    ]);

    assert.deepStrictEqual({minBucket:0,maxBucket:2},getBucketRange(toBucketSets(bucketMap1)))
  });

  it("different bucket structure",()=>{
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    const bucketMap2: BucketMap = new Map([
      [0, new Set([flashcard3])],
      [1, new Set([flashcard1, flashcard5])],
      [2, new Set([flashcard2])],
      [3, new Set([flashcard4])],
    ]);

    assert.deepStrictEqual({minBucket:3,maxBucket:1},getBucketRange(toBucketSets(bucketMap2)));
  })

  it("all flashcards in one bucket",()=>{
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];
    
    const bucketMap3: BucketMap = new Map([
      [0, new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])],
    ]);

    assert.deepStrictEqual({minBucket:0,maxBucket:0},getBucketRange(toBucketSets(bucketMap3)));
  })

  it("empty bucket among filled ones",()=>{
    const flashcardsArray = flashcards5();
    if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
        throw new Error("flashcards5() returned an unexpected value.");
    }

    const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray as [Flashcard, Flashcard, Flashcard, Flashcard, Flashcard];

    const bucketMap4: BucketMap = new Map([
      [0, new Set([])],
      [1, new Set([flashcard1, flashcard4])],
      [2, new Set([flashcard2])],
      [3, new Set([flashcard3, flashcard5])],
    ]);

    assert.deepStrictEqual({minBucket:0,maxBucket:3},getBucketRange(toBucketSets(bucketMap4)))
  })
});

/*
 * Testing strategy for practice():
 *
 * TODO: Describe your testing strategy for practice() here.
 */
describe("practice()", () => {
  // it("Example test case - replace with your own tests", () => {
  //   assert.fail(
  //     "Replace this test case with your own tests based on your testing strategy"
  //   );
  // });
});

/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
  // it("Example test case - replace with your own tests", () => {
  //   assert.fail(
  //     "Replace this test case with your own tests based on your testing strategy"
  //   );
  // });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
  // it("Example test case - replace with your own tests", () => {
  //   assert.fail(
  //     "Replace this test case with your own tests based on your testing strategy"
  //   );
  // });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  // it("Example test case - replace with your own tests", () => {
  //   assert.fail(
  //     "Replace this test case with your own tests based on your testing strategy"
  //   );
  // });
});
