# copyWithin

`copyWithin()` copies a slice of an array **onto another position of the same array**, overwriting what was there. The array's length never grows or shrinks: elements are only moved around inside it. It is rarely used in everyday UI code, but it shines when you work with fixed-size buffers (typed arrays, audio samples, sensor readings) where you want to shift data without allocating a new array.

## Syntax

```js
array.copyWithin(targetIndex, startIndex, endIndex);
```

- `targetIndex`: where the copied elements are pasted. Negative counts from the end.
- `startIndex` (optional, default `0`): where copying starts. Negative counts from the end.
- `endIndex` (optional, default `array.length`): where copying stops. **`endIndex` is excluded.**
- **Returns**: the **same** array (modified), not a copy.

> **Mutates the original array**, and never changes its length. There is no built-in non-mutating twin (no `toCopyWithin`); copy first: `[...arr].copyWithin(t, s, e)`.

In plain words (fixing the owner's rough note): it reads the elements from `startIndex` up to (not including) `endIndex`, and writes them starting at `targetIndex`, one after another. It writes `endIndex - startIndex` elements, and stops early if it reaches the end of the array. It does **not** paste "until startIndex": the number of pasted elements is the size of the copied range.

## 1. Basic usage

```js
const num = [1, 2, 3, 4, 5];
num.copyWithin(0, 3); // copy index 3..end ([4, 5]) and paste starting at index 0
num;                  // [4, 5, 3, 4, 5]  (length still 5)
```

Only two elements were overwritten (indexes 0 and 1), because the copied range `[4, 5]` has two elements.

## 2. Using endIndex

```js
const arr = ["a", "b", "c", "d", "e"];
arr.copyWithin(1, 3, 4); // copy index 3 only ("d"), paste at index 1
arr;                     // ["a", "d", "c", "d", "e"]
```

## 3. Negative indexes and clipping

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(-2, 0); // paste at index 3; copied range [1,2,3,4,5] is cut off at the end
arr;                   // [1, 2, 3, 1, 2]
```

The copy is done as if from a temporary copy, so overlapping ranges are safe:

```js
[1, 2, 3, 4, 5].copyWithin(1, 0); // [1, 1, 2, 3, 4]  (not [1, 1, 1, 1, 1])
```

## 4. Real-world example: rolling window of sensor readings

A live chart keeps the last 5 readings in a fixed-size `Float32Array`. Each new reading shifts everything one step left and writes at the end, with no new array allocated per tick.

```js
const readings = new Float32Array([20, 21, 22, 23, 24]);

function addReading(value) {
  readings.copyWithin(0, 1);           // shift left by one
  readings[readings.length - 1] = value;
}

addReading(25);
readings; // Float32Array [21, 22, 23, 24, 25]
```

`copyWithin` fits because typed arrays cannot `shift`/`push` (their length is fixed), and it moves the data in one fast native call.

## 5. Real-world example: remove an item from a fixed-size slot list

A game keeps up to 4 player slots in a fixed array. Removing a player closes the gap and frees the last slot.

```js
const slots = ["Ashu", "Rahul", "Priya", "Neha"];

function removeSlot(index) {
  slots.copyWithin(index, index + 1); // pull everything after index one step left
  slots[slots.length - 1] = null;     // last slot is now free
}

removeSlot(1);
slots; // ["Ashu", "Priya", "Neha", null]
```

It fits because the slot count must stay 4: `splice` would shrink the array.

## 6. Real-world example: repeating a pattern

Fill the first part of a buffer, then duplicate it to the second half, for example a two-bar drum pattern built from one bar.

```js
const beat = [1, 0, 1, 0, 0, 0, 0, 0];
beat.copyWithin(4, 0, 4); // copy first bar onto second bar
beat;                     // [1, 0, 1, 0, 1, 0, 1, 0]
```

It fits because the data is already in the array: no need to build a new one with `concat`.

## 7. In React state

Never call it on state directly. Copy first:

```js
setReadings((prev) => [...prev].copyWithin(0, 1).with(-1, newValue));
```

## Gotchas

- `endIndex` is **excluded**: `copyWithin(0, 1, 3)` copies indexes 1 and 2.
- It overwrites; it never inserts. Length stays the same.
- Returns the same array, so `const b = a.copyWithin(0, 3)` changes `a` too.
- Argument order is easy to mix up: **target first**, then the source range. Compare with `fill(value, start, end)` and `splice(start, deleteCount, ...items)`.
- Copies are shallow: objects are moved by reference, so two slots can end up pointing to the same object.

## Comparison

| Method | What it does | Changes length? | Mutates? | Returns |
| --- | --- | --- | --- | --- |
| `copyWithin(t, s, e)` | Copy a range onto another position | No | Yes | Same array |
| `fill(v, s, e)` | Overwrite a range with one value | No | Yes | Same array |
| `splice(s, n, ...items)` | Remove/insert/replace | Yes | Yes | Removed elements |
| `slice(s, e)` | Read a range | n/a | No | New array |
| `with(i, v)` | Replace one index | No | No | New array |

## Interview questions

**1. What does `[1, 2, 3, 4, 5].copyWithin(0, 3)` return?**

<details>
<summary>Answer</summary>

`[4, 5, 3, 4, 5]`. Elements from index 3 to the end (`[4, 5]`) are pasted starting at index 0. The length stays 5.

</details>

**2. Can `copyWithin` make an array longer?**

<details>
<summary>Answer</summary>

No. It only overwrites existing positions. If the copied range would run past the end, the extra elements are dropped.

</details>

**3. What is `[1, 2, 3, 4, 5].copyWithin(1, 0)`?**

<details>
<summary>Answer</summary>

`[1, 1, 2, 3, 4]`. The source is read as if copied first, so overlapping ranges do not cascade into `[1, 1, 1, 1, 1]`.

</details>

**4. How do you use `copyWithin` without changing the original array?**

<details>
<summary>Answer</summary>

There is no non-mutating version, so copy first: `[...arr].copyWithin(t, s, e)` or `arr.slice().copyWithin(t, s, e)`.

</details>
