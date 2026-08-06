// iOS / Swift interview question bank.
// Each question carries a difficulty, a topic, a model answer, and a list of
// keyPoints — the essential concepts an ideal answer should mention. The tool
// uses keyPoints to grade a submitted answer and highlight anything missed.

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export const TOPICS = [
  "Swift Fundamentals",
  "Optionals",
  "Value & Reference Types",
  "Memory Management",
  "Closures",
  "Protocols & Generics",
  "Concurrency",
  "SwiftUI",
  "UIKit",
  "Architecture & Patterns",
  "Networking",
  "Persistence",
  "Testing",
  "Combine",
  "Swift 6 & Data Races",
  "Performance",
  "System Design",
  "Coding Practice",
];

export const questions = [
  // ───────────────────────── Swift Fundamentals ─────────────────────────
  {
    id: "sf-1",
    topic: "Swift Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between `let` and `var` in Swift?",
    answer:
      "`let` declares a constant — its value cannot be reassigned after it is set. `var` declares a variable that can be reassigned. For reference types, `let` prevents reassigning the reference but the object's internal (mutable) state can still change. Prefer `let` by default for safety and to communicate intent; the compiler can also optimize immutable values.",
    keyPoints: ["constant", "variable", "reassign", "immutable", "prefer let"],
  },
  {
    id: "sf-2",
    topic: "Swift Fundamentals",
    difficulty: "Beginner",
    question: "What are tuples and when would you use one?",
    answer:
      "A tuple groups multiple values into a single compound value. The values can be of different types, and members can be named. Tuples are useful for returning multiple values from a function without defining a dedicated struct, e.g. `func minMax() -> (min: Int, max: Int)`. For anything that lives beyond a local scope or has meaning as an entity, prefer a struct.",
    keyPoints: ["group", "multiple values", "different types", "named", "return multiple"],
  },
  {
    id: "sf-3",
    topic: "Swift Fundamentals",
    difficulty: "Beginner",
    question: "Explain the difference between `struct` and `class`.",
    answer:
      "`struct` is a value type — copied on assignment and passing; each copy is independent. `class` is a reference type — assignment copies the reference, so multiple variables share one instance. Classes support inheritance, deinitializers, and identity (`===`); structs do not inherit but get a memberwise initializer. Swift favours structs for models to avoid shared mutable state.",
    keyPoints: ["value type", "reference type", "copied", "shared", "inheritance", "identity"],
  },
  {
    id: "sf-4",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What is an enum with associated values? Give an example.",
    answer:
      "An enum case can store associated values, letting each case carry additional data of any type. For example `enum Result { case success(Data); case failure(Error) }`. You extract associated values by pattern matching in a `switch` or with `if case let`. This models mutually exclusive states cleanly and is the basis of Swift's own `Optional` and `Result` types.",
    keyPoints: ["associated values", "case", "pattern matching", "switch", "mutually exclusive"],
  },
  {
    id: "sf-5",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What is the difference between `Any` and `AnyObject`?",
    answer:
      "`Any` can represent an instance of any type at all, including value types, functions, and optionals. `AnyObject` can represent only instances of class (reference) types. `AnyObject` is used for class-only protocol constraints and Objective-C interop. Both erase type information, so you must downcast with `as?`/`as!` to use the underlying type.",
    keyPoints: ["Any", "any type", "AnyObject", "class", "downcast", "type erasure"],
  },
  {
    id: "sf-6",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What are `defer` statements and when do they execute?",
    answer:
      "A `defer` block schedules code to run just before the current scope exits, regardless of how it exits — normal return, thrown error, or break. Multiple `defer` blocks run in reverse (LIFO) order. They are ideal for cleanup such as closing files, releasing locks, or balancing resource acquisition, keeping teardown next to setup.",
    keyPoints: ["scope exits", "cleanup", "reverse order", "LIFO", "return or throw"],
  },
  {
    id: "sf-7",
    topic: "Swift Fundamentals",
    difficulty: "Advanced",
    question: "Explain `@escaping` vs non-escaping closures.",
    answer:
      "A non-escaping closure is guaranteed to be called (or not) before the function returns, so it cannot outlive the call; the compiler can optimize it and you don't need `self.`. An `@escaping` closure may be stored and called later — e.g. a completion handler kept for an async network call. Escaping closures capture and retain their references, so you must watch for retain cycles and typically use `[weak self]`.",
    keyPoints: ["escaping", "stored", "called later", "non-escaping", "retain cycle", "weak self"],
  },
  {
    id: "sf-8",
    topic: "Swift Fundamentals",
    difficulty: "Advanced",
    question: "What are property wrappers? Give a real-world example.",
    answer:
      "A property wrapper is a type annotated with `@propertyWrapper` that adds reusable behaviour around a stored property via a `wrappedValue` (and optional `projectedValue`). It factors out repeated get/set logic. Examples: `@State`, `@Published`, `@AppStorage` in SwiftUI, or a custom `@Clamped`/`@UserDefault` wrapper. The `$` prefix exposes the projected value.",
    keyPoints: ["propertyWrapper", "wrappedValue", "reusable", "projectedValue", "State", "Published"],
  },

  // ───────────────────────── Optionals ─────────────────────────
  {
    id: "opt-1",
    topic: "Optionals",
    difficulty: "Beginner",
    question: "What is an Optional in Swift?",
    answer:
      "An Optional represents a value that may be absent. Under the hood it is an enum with two cases: `.some(Wrapped)` and `.none` (`nil`). Optionals make the possibility of 'no value' explicit in the type system, forcing you to handle nil safely instead of crashing on a null reference.",
    keyPoints: ["may be absent", "enum", "some", "none", "nil", "explicit"],
  },
  {
    id: "opt-2",
    topic: "Optionals",
    difficulty: "Beginner",
    question: "What are the ways to safely unwrap an optional?",
    answer:
      "Use optional binding (`if let`/`guard let`), the nil-coalescing operator (`??`) to supply a default, optional chaining (`?.`) to call into it safely, or a `switch` on `.some`/`.none`. `guard let` is preferred for early exit. Force unwrapping (`!`) is not safe — it crashes on nil and should be reserved for values you can prove are non-nil.",
    keyPoints: ["if let", "guard let", "nil-coalescing", "optional chaining", "force unwrap crashes"],
  },
  {
    id: "opt-3",
    topic: "Optionals",
    difficulty: "Intermediate",
    question: "What is an implicitly unwrapped optional and when is it appropriate?",
    answer:
      "An implicitly unwrapped optional (`Type!`) is an optional that is automatically force-unwrapped when accessed. It's appropriate when a value is nil only briefly during initialization but is guaranteed non-nil for the rest of the object's life — classically `@IBOutlet` properties set by the storyboard after `init`. Misuse leads to crashes, so favour regular optionals when in doubt.",
    keyPoints: ["implicitly unwrapped", "force-unwrapped", "IBOutlet", "nil during init", "crash"],
  },
  {
    id: "opt-4",
    topic: "Optionals",
    difficulty: "Intermediate",
    question: "Explain optional chaining and its return type.",
    answer:
      "Optional chaining (`a?.b?.c`) lets you call properties, methods, and subscripts on an optional that might be nil. If any link is nil the whole expression short-circuits and returns nil. The result is always an optional — even if the final property is non-optional — because the call may not have happened. That's why `let n = person?.name?.count` gives an `Int?`.",
    keyPoints: ["chaining", "nil short-circuits", "returns optional", "subscript", "method"],
  },

  // ───────────────────────── Value & Reference Types ─────────────────────────
  {
    id: "vr-1",
    topic: "Value & Reference Types",
    difficulty: "Intermediate",
    question: "What is copy-on-write and which types use it?",
    answer:
      "Copy-on-write (COW) defers copying a value type's underlying storage until it is actually mutated, so simple assignment is cheap. Swift's standard collections — Array, Dictionary, Set, and String — use COW. When you mutate a copy, the runtime checks whether the buffer is uniquely referenced (`isKnownUniquelyReferenced`) and only then makes a real copy. You can implement COW in your own types wrapping a class buffer.",
    keyPoints: ["copy-on-write", "defer copy", "mutation", "Array Dictionary Set String", "uniquely referenced"],
  },
  {
    id: "vr-2",
    topic: "Value & Reference Types",
    difficulty: "Intermediate",
    question: "Why does Swift favour value types for models?",
    answer:
      "Value types are copied, so there is no shared mutable state and no aliasing bugs where one part of the app unexpectedly changes another's data. They are inherently thread-safer, easier to reason about, and work well with SwiftUI's diffing and with `Equatable`/`Hashable`. Reference semantics are reserved for things with identity or shared lifecycle, like view controllers or services.",
    keyPoints: ["copied", "no shared state", "thread-safe", "predictable", "identity for reference"],
  },
  {
    id: "vr-3",
    topic: "Value & Reference Types",
    difficulty: "Advanced",
    question: "What does `mutating` mean on a struct method?",
    answer:
      "Because struct methods can't normally change the instance's stored properties, marking a method `mutating` allows it to modify `self` (and even reassign `self` entirely). Under the hood `self` is passed as `inout`. You can only call a mutating method on a `var` instance, not a `let` one, which is how the compiler enforces value-type immutability.",
    keyPoints: ["mutating", "modify self", "inout", "var only", "not let"],
  },

  // ───────────────────────── Memory Management ─────────────────────────
  {
    id: "mem-1",
    topic: "Memory Management",
    difficulty: "Beginner",
    question: "How does ARC work in Swift?",
    answer:
      "Automatic Reference Counting tracks how many strong references point to each class instance. When you assign an instance the count goes up; when a reference goes out of scope or is set to nil it goes down. When the strong count reaches zero the instance is deallocated and `deinit` runs. ARC works at compile time by inserting retain/release calls — it is not a garbage collector and only applies to reference types.",
    keyPoints: ["reference counting", "strong references", "count zero", "deinit", "compile time", "not garbage collection"],
  },
  {
    id: "mem-2",
    topic: "Memory Management",
    difficulty: "Intermediate",
    question: "What is a retain cycle and how do you break it?",
    answer:
      "A retain cycle happens when two objects hold strong references to each other (or an object and an escaping closure do), so neither's reference count ever reaches zero and both leak. You break it by making one reference `weak` or `unowned`. In closures, use a capture list like `[weak self]` and safely unwrap, or `[unowned self]` only when self is guaranteed to outlive the closure.",
    keyPoints: ["strong references to each other", "count never zero", "leak", "weak", "unowned", "capture list"],
  },
  {
    id: "mem-3",
    topic: "Memory Management",
    difficulty: "Intermediate",
    question: "What is the difference between `weak` and `unowned`?",
    answer:
      "Both create non-owning references that don't increase the retain count. A `weak` reference is optional and becomes nil automatically when the referent is deallocated — safe but requires unwrapping. An `unowned` reference is non-optional and assumes the referent always outlives it; accessing it after deallocation crashes. Use `weak` when the other object can legitimately become nil; `unowned` when their lifetimes are tightly coupled (e.g. a child that can't outlive its parent).",
    keyPoints: ["weak optional nil", "unowned non-optional", "no retain", "crash if deallocated", "lifetime"],
  },
  {
    id: "mem-4",
    topic: "Memory Management",
    difficulty: "Advanced",
    question: "How would you detect and diagnose a memory leak in an iOS app?",
    answer:
      "Use Instruments' Leaks and Allocations tools to spot instances that are never freed, and the Xcode Memory Graph Debugger to see which objects retain a leaked instance and where the cycle is. Add `deinit` logging to confirm view controllers deallocate on dismissal. Common culprits are closures capturing `self` strongly, delegates declared `strong` instead of `weak`, and Timers/NotificationCenter observers not invalidated.",
    keyPoints: ["Instruments Leaks", "memory graph debugger", "deinit logging", "closure capture", "strong delegate", "timer"],
  },

  // ───────────────────────── Closures ─────────────────────────
  {
    id: "cl-1",
    topic: "Closures",
    difficulty: "Beginner",
    question: "What is a closure and how does it differ from a function?",
    answer:
      "A closure is a self-contained block of functionality that can be passed around and stored. It can capture and store references to variables and constants from its surrounding context (closing over them). Functions are actually a special, named case of closures. Closures support shorthand syntax: trailing closures, implicit returns, and shorthand argument names like `$0`.",
    keyPoints: ["block of functionality", "capture", "surrounding context", "passed around", "trailing closure"],
  },
  {
    id: "cl-2",
    topic: "Closures",
    difficulty: "Intermediate",
    question: "What is a capture list and why does capture semantics matter?",
    answer:
      "A capture list (e.g. `[weak self, count]`) explicitly controls how a closure captures values. By default closures capture references strongly and capture variables by reference, which can create retain cycles or capture unexpected later values. A capture list lets you capture weakly/unowned to avoid cycles, or capture a value by copy at the point of definition. It appears at the start of the closure before the parameter list.",
    keyPoints: ["capture list", "weak unowned", "avoid retain cycle", "capture by value", "reference by default"],
  },
  {
    id: "cl-3",
    topic: "Closures",
    difficulty: "Advanced",
    question: "Explain higher-order functions map, filter, reduce, compactMap, and flatMap.",
    answer:
      "`map` transforms each element into a new one. `filter` keeps elements matching a predicate. `reduce` combines all elements into a single accumulated value. `compactMap` maps then removes nils, unwrapping optionals. `flatMap` flattens a sequence of sequences into one level. These express transformations declaratively and are the idiomatic alternative to manual loops.",
    keyPoints: ["map transform", "filter predicate", "reduce accumulate", "compactMap removes nil", "flatMap flatten"],
  },

  // ───────────────────────── Protocols & Generics ─────────────────────────
  {
    id: "pg-1",
    topic: "Protocols & Generics",
    difficulty: "Beginner",
    question: "What is a protocol and how is it different from a class?",
    answer:
      "A protocol defines a contract — a set of method, property, and initializer requirements — without providing implementation (unless extended). Types conform to a protocol to promise they satisfy it. Unlike class inheritance, a type can conform to many protocols, and protocols work with structs and enums too. This enables composition over inheritance.",
    keyPoints: ["contract", "requirements", "conform", "multiple protocols", "structs enums", "composition"],
  },
  {
    id: "pg-2",
    topic: "Protocols & Generics",
    difficulty: "Intermediate",
    question: "What are protocol extensions and default implementations?",
    answer:
      "A protocol extension adds method/property implementations to a protocol, giving every conforming type default behaviour it can use or override. This is the heart of protocol-oriented programming — you share code horizontally without a base class. Note dispatch nuance: methods declared in the protocol use dynamic dispatch, but methods only in the extension use static dispatch based on the compile-time type.",
    keyPoints: ["default implementation", "protocol-oriented", "share code", "override", "static vs dynamic dispatch"],
  },
  {
    id: "pg-3",
    topic: "Protocols & Generics",
    difficulty: "Intermediate",
    question: "What are generics and why are they useful?",
    answer:
      "Generics let you write flexible, reusable code that works with any type while preserving type safety. A generic function or type uses placeholder type parameters (e.g. `<T>`) resolved at the call site. `Array<Element>` and `Optional<Wrapped>` are generic. You can constrain type parameters (`<T: Comparable>`) to require capabilities. Generics avoid code duplication and the type erasure/casting of using `Any`.",
    keyPoints: ["reusable", "any type", "type safety", "placeholder", "constraints", "avoid duplication"],
  },
  {
    id: "pg-4",
    topic: "Protocols & Generics",
    difficulty: "Advanced",
    question: "What are associated types and `some`/`any` for protocols?",
    answer:
      "An `associatedtype` is a placeholder type inside a protocol, resolved by each conformer (e.g. `Element` in `Sequence`). Protocols with associated types can't be used as plain types. `some P` is an opaque type — a specific single concrete type the caller doesn't know but the compiler does (used for SwiftUI's `some View`). `any P` is an existential — a boxed value that can hold any conformer, with runtime overhead. Prefer `some` when there's one underlying type.",
    keyPoints: ["associatedtype", "placeholder", "some opaque", "any existential", "some View", "runtime overhead"],
  },

  // ───────────────────────── Concurrency ─────────────────────────
  {
    id: "con-1",
    topic: "Concurrency",
    difficulty: "Beginner",
    question: "What is the difference between synchronous and asynchronous code?",
    answer:
      "Synchronous code runs to completion and blocks the current thread until it returns. Asynchronous code starts work and returns immediately, delivering its result later (via a completion handler, or by suspending and resuming with `async/await`) so the thread is free to do other work. Long-running work like networking must be async to keep the main thread — and thus the UI — responsive.",
    keyPoints: ["synchronous blocks", "asynchronous returns immediately", "result later", "main thread", "responsive UI"],
  },
  {
    id: "con-2",
    topic: "Concurrency",
    difficulty: "Beginner",
    question: "Why must UI updates happen on the main thread?",
    answer:
      "UIKit and SwiftUI are not thread-safe and expect all view work on the main thread, which owns the run loop that drives rendering and touch handling. Updating UI from a background thread causes glitches, crashes, or undefined behaviour. After background work you hop back with `DispatchQueue.main.async`, or mark code `@MainActor` in Swift Concurrency so the compiler guarantees it runs on the main actor.",
    keyPoints: ["not thread-safe", "main thread", "run loop", "DispatchQueue.main", "MainActor"],
  },
  {
    id: "con-3",
    topic: "Concurrency",
    difficulty: "Intermediate",
    question: "Explain GCD: queues, `async` vs `sync`, and serial vs concurrent.",
    answer:
      "Grand Central Dispatch schedules work onto dispatch queues. A serial queue runs one task at a time in order; a concurrent queue can run many at once. `queue.async` submits work and returns immediately; `queue.sync` blocks the caller until the work finishes (and can deadlock if you sync onto the queue you're already on, especially the main queue). Quality-of-service classes prioritize work. The main queue is serial and drives the UI.",
    keyPoints: ["dispatch queues", "serial one at a time", "concurrent many", "async returns", "sync blocks deadlock", "QoS"],
  },
  {
    id: "con-4",
    topic: "Concurrency",
    difficulty: "Intermediate",
    question: "What is async/await and how does it improve on completion handlers?",
    answer:
      "`async/await` lets you write asynchronous code in a straight-line, synchronous-looking style. An `async` function can suspend at an `await` point, freeing the thread, and resume when the awaited work completes. It replaces nested completion-handler 'pyramids of doom', propagates errors with normal `try`, and avoids the easy mistake of forgetting to call a callback on every path. You call async functions from a `Task` or another async context.",
    keyPoints: ["async await", "suspend resume", "straight-line", "avoids callback nesting", "try errors", "Task"],
  },
  {
    id: "con-5",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "What are actors and what problem do they solve?",
    answer:
      "An actor is a reference type that protects its mutable state from data races by serializing access: only one task touches its state at a time, and cross-actor access is `await`ed. This gives compiler-enforced isolation without manual locks. `@MainActor` is a global actor that pins work to the main thread. Actors are re-entrant, so state can change across an `await` suspension — a subtlety you must account for.",
    keyPoints: ["actor", "data race", "serialized access", "isolation", "no locks", "MainActor", "re-entrant"],
  },
  {
    id: "con-6",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "Explain structured concurrency, TaskGroup, and task cancellation.",
    answer:
      "Structured concurrency ties child task lifetimes to a parent scope: with `async let` or a `TaskGroup` you spawn concurrent children and the scope won't return until all complete, so errors and cancellation propagate predictably. A `TaskGroup` runs a dynamic number of child tasks and collects results. Cancellation is cooperative — a cancelled task keeps running until it checks `Task.isCancelled` or hits a cancellation-aware `await` that throws `CancellationError`.",
    keyPoints: ["structured concurrency", "async let", "TaskGroup", "child tasks", "cancellation cooperative", "isCancelled"],
  },
  {
    id: "con-7",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "What is a race condition and how do you prevent one?",
    answer:
      "A race condition occurs when the correctness of a program depends on the unpredictable timing of concurrent accesses to shared mutable state, at least one of which is a write. Prevent it by serializing access: a serial dispatch queue, locks (`NSLock`, `os_unfair_lock`), a dispatch barrier on a concurrent queue, or — the modern approach — isolating the state inside an actor so the compiler enforces safe access.",
    keyPoints: ["shared mutable state", "timing", "write", "serial queue", "lock", "barrier", "actor"],
  },

  // ───────────────────────── SwiftUI ─────────────────────────
  {
    id: "su-1",
    topic: "SwiftUI",
    difficulty: "Beginner",
    question: "What is SwiftUI and how does its declarative model work?",
    answer:
      "SwiftUI is Apple's declarative UI framework: you describe what the UI should look like for a given state, and the framework figures out how to render and update it. A `View` is a lightweight value type whose `body` is recomputed when its state changes; SwiftUI diffs the new description against the old and applies minimal updates. This contrasts with UIKit's imperative, manually-mutated view hierarchy.",
    keyPoints: ["declarative", "describe UI for state", "View value type", "body recomputed", "diff", "vs imperative"],
  },
  {
    id: "su-2",
    topic: "SwiftUI",
    difficulty: "Intermediate",
    question: "Explain `@State`, `@Binding`, `@StateObject`, and `@ObservedObject`.",
    answer:
      "`@State` is local, view-owned mutable value-type state; SwiftUI stores it and re-renders on change. `@Binding` is a two-way reference to state owned elsewhere, letting a child read and write the parent's value. `@StateObject` creates and owns an `ObservableObject` reference type once for the view's lifetime. `@ObservedObject` observes an object owned elsewhere and does not control its lifecycle — using it where you should use `@StateObject` can recreate the object on re-render.",
    keyPoints: ["State local", "Binding two-way", "StateObject owns creates once", "ObservedObject observes external", "ObservableObject", "lifecycle"],
  },
  {
    id: "su-3",
    topic: "SwiftUI",
    difficulty: "Intermediate",
    question: "What is `@EnvironmentObject` and when would you use it?",
    answer:
      "`@EnvironmentObject` injects an `ObservableObject` into the environment so any descendant view can read it without passing it explicitly through every initializer. You supply it once with `.environmentObject(_:)` on an ancestor. It's ideal for app-wide dependencies like a session, theme, or router. The trade-off is a runtime crash if the object isn't provided, versus compile-time safety of explicit passing.",
    keyPoints: ["environment", "descendant access", "no explicit passing", "environmentObject modifier", "app-wide", "crash if missing"],
  },
  {
    id: "su-4",
    topic: "SwiftUI",
    difficulty: "Advanced",
    question: "How does SwiftUI decide to re-render a view, and how do you keep it efficient?",
    answer:
      "SwiftUI recomputes a view's `body` when its observed state changes, then diffs the result using each view's identity and `Equatable`-like comparison of stored properties to update only what changed. Keep it efficient by keeping views small so invalidation is localized, giving list items stable identity (`Identifiable`), avoiding heavy work in `body`, using `@State`/`@Binding` at the right granularity, and being careful that `@Published` changes don't invalidate more of the tree than necessary.",
    keyPoints: ["body recomputed on state change", "diff", "identity", "small views", "stable identity Identifiable", "avoid heavy work in body"],
  },
  {
    id: "su-5",
    topic: "SwiftUI",
    difficulty: "Advanced",
    question: "What is the difference between `@Observable` (Observation) and `ObservableObject`?",
    answer:
      "`ObservableObject` uses `@Published` and Combine; every published change notifies all observers of that object, so a view re-renders even if it reads an unrelated property. The newer `@Observable` macro (Observation framework, iOS 17+) tracks property access per view, so a view only invalidates when a property it actually reads changes — finer-grained and faster. It also removes the need for `@Published` and lets you drop `@ObservedObject` in favour of plain references.",
    keyPoints: ["ObservableObject Published Combine", "notifies all", "Observable macro", "per-property tracking", "iOS 17", "finer-grained"],
  },

  // ───────────────────────── UIKit ─────────────────────────
  {
    id: "uk-1",
    topic: "UIKit",
    difficulty: "Beginner",
    question: "Describe the UIViewController lifecycle methods.",
    answer:
      "`viewDidLoad` runs once after the view loads into memory — set up subviews and one-time configuration here. `viewWillAppear` runs before the view becomes visible each time; `viewDidAppear` after it's on screen (start animations/analytics). `viewWillDisappear`/`viewDidDisappear` run as it's removed (save state, stop timers). `viewWillLayoutSubviews`/`viewDidLayoutSubviews` bracket layout passes. Don't rely on frame sizes in `viewDidLoad` — they aren't final yet.",
    keyPoints: ["viewDidLoad once", "viewWillAppear", "viewDidAppear", "viewWillDisappear", "layoutSubviews", "frames not final in viewDidLoad"],
  },
  {
    id: "uk-2",
    topic: "UIKit",
    difficulty: "Intermediate",
    question: "How does `UITableView` cell reuse work and why does it matter?",
    answer:
      "A table view keeps a small pool of cells and reuses them as you scroll rather than allocating one per row. You call `dequeueReusableCell(withIdentifier:)` in `cellForRowAt`; if a cell scrolls off screen it goes back in the pool for a new row. This keeps memory and performance constant regardless of data size. Because cells are recycled you must reset all mutable state (in `prepareForReuse` or by always configuring every field) to avoid stale content.",
    keyPoints: ["reuse pool", "dequeueReusableCell", "constant memory", "recycled", "prepareForReuse", "reset state"],
  },
  {
    id: "uk-3",
    topic: "UIKit",
    difficulty: "Intermediate",
    question: "What is the delegate pattern and how is it typically implemented?",
    answer:
      "The delegate pattern lets one object hand off decisions or event handling to another via a protocol. The delegating object declares a `weak var delegate: SomeDelegate?` and calls its methods at key moments; the delegate conforms to the protocol and implements the behaviour. The reference is `weak` to avoid a retain cycle. UIKit uses it heavily (`UITableViewDelegate`, `UITextFieldDelegate`) for one-to-one communication.",
    keyPoints: ["protocol", "hand off", "weak delegate", "conform", "avoid retain cycle", "one-to-one"],
  },
  {
    id: "uk-4",
    topic: "UIKit",
    difficulty: "Advanced",
    question: "Explain Auto Layout: constraints, priorities, and content hugging vs compression resistance.",
    answer:
      "Auto Layout positions views by solving a system of constraints (linear equations/inequalities) relating attributes like leading, width, or centerY. Each constraint has a priority (1–1000); when constraints conflict, the solver satisfies higher priorities first and can break lower ones. Content hugging priority resists a view growing larger than its intrinsic size; compression resistance resists it shrinking smaller. Tuning these decides which view stretches or truncates when space is tight.",
    keyPoints: ["constraints", "linear equations", "priority", "conflict breaks lower", "content hugging grow", "compression resistance shrink", "intrinsic size"],
  },

  // ───────────────────────── Architecture & Patterns ─────────────────────────
  {
    id: "arch-1",
    topic: "Architecture & Patterns",
    difficulty: "Beginner",
    question: "Explain the MVC pattern and its common criticism on iOS.",
    answer:
      "Model-View-Controller separates data (Model), presentation (View), and mediation (Controller). On iOS UIKit, the view controller owns the views and the model, so it tends to accumulate networking, formatting, and business logic — earning the nickname 'Massive View Controller'. The criticism is poor testability and low cohesion, which motivates patterns like MVVM that move logic out of the controller.",
    keyPoints: ["Model View Controller", "separation", "controller mediates", "massive view controller", "testability"],
  },
  {
    id: "arch-2",
    topic: "Architecture & Patterns",
    difficulty: "Intermediate",
    question: "What is MVVM and why is it popular for iOS?",
    answer:
      "Model-View-ViewModel adds a ViewModel between view and model. The ViewModel exposes presentation-ready state and handles logic (formatting, validation, calling services), while the View just binds to it and forwards user intent. This makes the ViewModel independent of UIKit/SwiftUI and therefore unit-testable, and it pairs naturally with SwiftUI's data flow or with bindings/Combine in UIKit. It shrinks view controllers and improves separation of concerns.",
    keyPoints: ["ViewModel", "presentation state", "logic out of view", "testable", "binding", "SwiftUI Combine"],
  },
  {
    id: "arch-3",
    topic: "Architecture & Patterns",
    difficulty: "Intermediate",
    question: "What is dependency injection and why does it help testing?",
    answer:
      "Dependency injection means an object receives its collaborators (a network client, a store) from outside — via initializer, property, or method — instead of creating them itself. This decouples the object from concrete implementations, so in tests you can inject a mock or stub conforming to the same protocol and control its behaviour. It also clarifies dependencies and enables swapping implementations (e.g. real vs fake API) without changing the dependent code.",
    keyPoints: ["receive collaborators", "from outside", "initializer injection", "decouple", "mock in tests", "protocol"],
  },
  {
    id: "arch-4",
    topic: "Architecture & Patterns",
    difficulty: "Advanced",
    question: "What is the Coordinator pattern and what problem does it solve?",
    answer:
      "A Coordinator is an object that owns navigation flow, deciding which screen comes next and creating/wiring the view controllers, so view controllers no longer know about each other or push/present directly. This removes navigation logic from view controllers, makes flows reusable and testable, and centralizes deep-linking. Coordinators are typically organized in a tree with a parent app coordinator and child coordinators for feature flows.",
    keyPoints: ["owns navigation", "which screen next", "decouples view controllers", "reusable flows", "deep linking", "coordinator tree"],
  },
  {
    id: "arch-5",
    topic: "Architecture & Patterns",
    difficulty: "Advanced",
    question: "Explain the SOLID principles briefly.",
    answer:
      "Single Responsibility: a type should have one reason to change. Open/Closed: open for extension, closed for modification — add behaviour without editing existing code. Liskov Substitution: subtypes must be usable wherever their supertype is expected. Interface Segregation: prefer small, focused protocols over fat ones. Dependency Inversion: depend on abstractions (protocols), not concrete types. Together they guide loosely coupled, maintainable, testable design.",
    keyPoints: ["single responsibility", "open closed", "liskov substitution", "interface segregation", "dependency inversion", "abstractions"],
  },

  // ───────────────────────── Networking ─────────────────────────
  {
    id: "net-1",
    topic: "Networking",
    difficulty: "Beginner",
    question: "How do you make a network request with URLSession?",
    answer:
      "Create a `URLRequest` (or use a URL directly), then use `URLSession.shared` to run a task. Modern code uses `let (data, response) = try await URLSession.shared.data(for: request)`; older code uses `dataTask(with:completionHandler:)` and must call `.resume()`. You check the `HTTPURLResponse` status code, then decode the `Data`. Remember completion-handler callbacks may arrive on a background thread, so hop to main before UI updates.",
    keyPoints: ["URLRequest", "URLSession", "data(for:) await", "dataTask resume", "status code", "decode", "main thread"],
  },
  {
    id: "net-2",
    topic: "Networking",
    difficulty: "Intermediate",
    question: "How does Codable work for JSON parsing?",
    answer:
      "`Codable` (Encodable & Decodable) lets a type serialize to/from formats like JSON with compiler-synthesized conformance when all stored properties are Codable. You decode with `JSONDecoder().decode(MyType.self, from: data)`. Customize with `CodingKeys` to map differing JSON keys, `keyDecodingStrategy = .convertFromSnakeCase`, custom `init(from:)` for irregular shapes, and `dateDecodingStrategy` for date formats. Decoding throws on mismatch, so wrap in `try`.",
    keyPoints: ["Codable", "JSONDecoder decode", "synthesized", "CodingKeys", "snake case", "custom init(from:)", "throws"],
  },
  {
    id: "net-3",
    topic: "Networking",
    difficulty: "Advanced",
    question: "How would you design a robust, testable networking layer?",
    answer:
      "Define an abstraction (e.g. a `NetworkClient` protocol or a `Request`/`Endpoint` type describing path, method, headers, body) so call sites depend on the protocol, not URLSession. Centralize decoding, auth token injection, error mapping, and retry/backoff. Inject a `URLSession` (or a `URLProtocol` stub) so tests run without real network. Return typed models and a domain `Error`. Handle status codes, timeouts, cancellation, and reachability explicitly.",
    keyPoints: ["protocol abstraction", "Endpoint", "inject URLSession", "URLProtocol stub for tests", "centralize decoding auth", "retry", "typed errors"],
  },

  // ───────────────────────── Persistence ─────────────────────────
  {
    id: "per-1",
    topic: "Persistence",
    difficulty: "Beginner",
    question: "What are the main options for persisting data on iOS?",
    answer:
      "`UserDefaults` for small key-value preferences; the Keychain for secure/sensitive data like tokens; plain files (including `Codable` encoded to JSON) in the app's sandbox directories; Core Data or the newer SwiftData for structured object graphs with querying; and SQLite/third-party wrappers for direct relational storage. Choose by data size, structure, query needs, and security — never store secrets in UserDefaults.",
    keyPoints: ["UserDefaults preferences", "Keychain secure", "files Codable", "Core Data SwiftData", "SQLite", "not secrets in UserDefaults"],
  },
  {
    id: "per-2",
    topic: "Persistence",
    difficulty: "Intermediate",
    question: "What is Core Data and what are its core components?",
    answer:
      "Core Data is Apple's object graph and persistence framework. Key pieces: the Managed Object Model (`.xcdatamodeld` describing entities), the Persistent Store Coordinator (bridges model and the store, often SQLite), the Managed Object Context (a scratchpad where you create/fetch/edit `NSManagedObject`s and then `save()`), and `NSPersistentContainer` which wires these up. Use background contexts for heavy work and merge changes to the main context for UI.",
    keyPoints: ["object graph", "managed object model", "persistent store coordinator", "managed object context", "save", "NSPersistentContainer", "background context"],
  },
  {
    id: "per-3",
    topic: "Persistence",
    difficulty: "Advanced",
    question: "How do you keep Core Data responsive and thread-safe?",
    answer:
      "`NSManagedObject`s and contexts are not thread-safe — each context is confined to its own queue. Do inserts/imports on a background context (`newBackgroundContext`/`performBackgroundTask`), always access a context via `perform`/`performAndWait`, and never pass managed objects across threads — pass `NSManagedObjectID` instead. Merge background saves into the view context (or set `automaticallyMergesChangesFromParent`). Batch operations and fetch with `NSFetchedResultsController` for efficient list UIs.",
    keyPoints: ["not thread-safe", "context per queue", "background context", "perform performAndWait", "pass NSManagedObjectID", "merge changes", "NSFetchedResultsController"],
  },

  // ───────────────────────── Testing ─────────────────────────
  {
    id: "test-1",
    topic: "Testing",
    difficulty: "Beginner",
    question: "What is a unit test and what makes a good one?",
    answer:
      "A unit test verifies a small, isolated piece of logic (a function or type) in a fast, repeatable way, typically following Arrange-Act-Assert. A good unit test is deterministic, independent of other tests, tests one behaviour, uses clear naming, and avoids real network/disk by injecting mocks. In XCTest you subclass `XCTestCase` and use `XCTAssert` family; Swift Testing uses `@Test` and `#expect`.",
    keyPoints: ["isolated logic", "fast repeatable", "arrange act assert", "deterministic", "independent", "XCTest", "mocks"],
  },
  {
    id: "test-2",
    topic: "Testing",
    difficulty: "Intermediate",
    question: "What is the difference between a mock, stub, and spy?",
    answer:
      "A stub returns canned data to steer the code under test down a path. A mock is a stub plus expectations — it verifies that certain methods were called with certain arguments, failing the test otherwise. A spy records how it was used (calls, arguments) so the test can assert afterward, without necessarily setting expectations up front. All are test doubles substituted via dependency injection, usually conforming to the same protocol as the real collaborator.",
    keyPoints: ["stub canned data", "mock expectations verify calls", "spy records usage", "test doubles", "dependency injection", "protocol"],
  },
  {
    id: "test-3",
    topic: "Testing",
    difficulty: "Advanced",
    question: "How do you test asynchronous code?",
    answer:
      "With `async/await` you simply mark the test `async` and `await` the call, then assert — no waiting boilerplate. For callback/Combine APIs, use `XCTestExpectation` and `wait(for:timeout:)`, fulfilling the expectation in the callback. Inject controllable dependencies (fake network via `URLProtocol`, a test scheduler/clock) so timing is deterministic rather than relying on real delays, which make tests slow and flaky.",
    keyPoints: ["async test await", "XCTestExpectation", "wait timeout", "fulfill in callback", "URLProtocol", "deterministic not flaky"],
  },

  // ───────────────────────── Coding Practice ─────────────────────────
  {
    id: "code-1",
    topic: "Coding Practice",
    difficulty: "Beginner",
    question: "Write a function to reverse a string without using the built-in reversed().",
    answer:
      "Convert the string to a character array, then swap from both ends toward the middle:\n\n```swift\nfunc reverse(_ s: String) -> String {\n    var chars = Array(s)\n    var i = 0, j = chars.count - 1\n    while i < j {\n        chars.swapAt(i, j)\n        i += 1; j -= 1\n    }\n    return String(chars)\n}\n```\n\nThis is O(n) time and O(n) space (Strings are immutable, so we need a mutable buffer). Mention that Swift Characters are grapheme clusters, so this reverses user-perceived characters correctly.",
    keyPoints: ["character array", "two pointers", "swap ends", "O(n)", "grapheme"],
  },
  {
    id: "code-2",
    topic: "Coding Practice",
    difficulty: "Beginner",
    question: "How do you check if a string is a palindrome?",
    answer:
      "Use two pointers from both ends comparing characters, or compare against its reverse. Two-pointer version is O(n) time, O(1) extra space:\n\n```swift\nfunc isPalindrome(_ s: String) -> Bool {\n    let chars = Array(s)\n    var i = 0, j = chars.count - 1\n    while i < j {\n        if chars[i] != chars[j] { return false }\n        i += 1; j -= 1\n    }\n    return true\n}\n```\n\nClarify with the interviewer whether to ignore case, spaces, and punctuation.",
    keyPoints: ["two pointers", "compare ends", "O(n)", "clarify case and punctuation"],
  },
  {
    id: "code-3",
    topic: "Coding Practice",
    difficulty: "Intermediate",
    question: "Find the two numbers in an array that sum to a target (Two Sum).",
    answer:
      "Use a hash map to store each value's index as you scan; for each element check whether `target - element` was already seen. This is O(n) time and O(n) space, better than the O(n²) brute-force double loop.\n\n```swift\nfunc twoSum(_ nums: [Int], _ target: Int) -> [Int]? {\n    var seen = [Int: Int]()\n    for (i, n) in nums.enumerated() {\n        if let j = seen[target - n] { return [j, i] }\n        seen[n] = i\n    }\n    return nil\n}\n```",
    keyPoints: ["hash map", "target minus element", "O(n)", "one pass", "store index"],
  },
  {
    id: "code-4",
    topic: "Coding Practice",
    difficulty: "Intermediate",
    question: "Explain Big-O and give the complexity of common operations on Array and Dictionary.",
    answer:
      "Big-O describes how running time or space grows with input size, ignoring constants. Array: index access O(1), append amortized O(1), insert/remove at front O(n), `contains` O(n). Dictionary: average O(1) lookup, insert, and delete via hashing (O(n) worst case with collisions). Set is like Dictionary. Choosing the right structure — e.g. a Set/Dictionary for membership instead of scanning an array — is often the key optimization.",
    keyPoints: ["growth with input", "array index O(1)", "array contains O(n)", "dictionary O(1) average", "hashing", "choose structure"],
  },
  {
    id: "code-5",
    topic: "Coding Practice",
    difficulty: "Advanced",
    question: "Detect a cycle in a linked list.",
    answer:
      "Use Floyd's tortoise-and-hare: advance a slow pointer one node and a fast pointer two nodes per step. If they ever meet there's a cycle; if fast reaches nil the list terminates. It's O(n) time and O(1) space, beating the O(n) space hash-set approach.\n\n```swift\nfunc hasCycle(_ head: Node?) -> Bool {\n    var slow = head, fast = head\n    while fast != nil && fast?.next != nil {\n        slow = slow?.next\n        fast = fast?.next?.next\n        if slow === fast { return true }\n    }\n    return false\n}\n```",
    keyPoints: ["Floyd tortoise and hare", "slow fast pointers", "meet means cycle", "O(1) space", "O(n) time"],
  },
  {
    id: "code-6",
    topic: "Coding Practice",
    difficulty: "Advanced",
    question: "How would you debounce rapid user input (e.g. a search field)?",
    answer:
      "Debouncing delays acting on input until a quiet period has elapsed, so only the last event in a burst fires. Cancel any pending work item on each keystroke and schedule a new one after a delay:\n\n```swift\nvar workItem: DispatchWorkItem?\nfunc search(_ query: String) {\n    workItem?.cancel()\n    let item = DispatchWorkItem { performSearch(query) }\n    workItem = item\n    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3, execute: item)\n}\n```\n\nWith Combine you'd use `.debounce(for:scheduler:)`; with async you'd cancel the previous `Task`. This cuts wasted network calls.",
    keyPoints: ["delay until quiet", "cancel pending", "DispatchWorkItem asyncAfter", "Combine debounce", "cancel Task", "reduce calls"],
  },

  // ═══════════════════════════ EXPANDED SET ═══════════════════════════

  // ───────────────────────── Swift Fundamentals ─────────────────────────
  {
    id: "sf-9",
    topic: "Swift Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between `==` and `===` in Swift?",
    answer:
      "`==` compares values for equality and is defined by the `Equatable` protocol — you can implement it for your own types. `===` (and `!==`) is the identity operator: it checks whether two references point to the exact same class instance in memory. `===` only applies to reference types (classes); value types don't have identity. Two distinct objects can be `==` (equal) but not `===` (not the same instance).",
    keyPoints: ["equality Equatable", "identity same instance", "reference types only", "value vs identity"],
  },
  {
    id: "sf-10",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What is the difference between `map`, `flatMap`, and `compactMap` on an Optional?",
    answer:
      "On an optional, `map` applies a transform to the wrapped value if present, returning a new optional (`Int?` → `String?`). `flatMap` applies a transform that itself returns an optional and flattens the result, avoiding a double-optional (`Int??` → `Int?`). `compactMap` is a Sequence operation, not an Optional one — it maps then filters out nils. The distinction: `map` wraps the closure's result in an optional; `flatMap` expects the closure to already return an optional.",
    keyPoints: ["map transforms wrapped", "flatMap flattens double optional", "compactMap sequence removes nil", "avoid nested optional"],
  },
  {
    id: "sf-11",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What are `lazy` properties and when should you use them?",
    answer:
      "A `lazy var` is a stored property whose initial value isn't computed until the first time it's accessed. It's useful when the initial value is expensive to compute, depends on other properties not available at init time, or may never be needed. Caveats: it must be `var` (not `let`), it isn't thread-safe (concurrent first access can compute it twice), and it breaks the value-type copy story since accessing it mutates the instance.",
    keyPoints: ["computed on first access", "expensive value", "must be var", "not thread-safe", "depends on other properties"],
  },
  {
    id: "sf-12",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What is the difference between a stored property and a computed property?",
    answer:
      "A stored property holds a value in memory as part of the instance. A computed property has no backing storage — it provides a getter (and optionally a setter) that calculates its value each time it's accessed, usually derived from other properties. Computed properties can't be `lazy` and can't have property observers on themselves, but their getter can run arbitrary logic. Use computed properties for values that should always stay in sync with their inputs.",
    keyPoints: ["stored holds value", "computed no storage", "getter setter", "derived", "always in sync"],
  },
  {
    id: "sf-13",
    topic: "Swift Fundamentals",
    difficulty: "Intermediate",
    question: "What do `willSet` and `didSet` property observers do?",
    answer:
      "Property observers run code in response to changes in a stored property's value. `willSet` runs just before the new value is stored (with the new value available as `newValue`); `didSet` runs immediately after (with the previous value as `oldValue`). They don't fire during initialization, and they don't fire when a property is set inside its own `didSet`. Common uses: updating UI when a model value changes, or validating/reacting to state.",
    keyPoints: ["willSet before", "didSet after", "newValue oldValue", "not during init", "react to change"],
  },
  {
    id: "sf-14",
    topic: "Swift Fundamentals",
    difficulty: "Advanced",
    question: "What is the difference between `throws`, `rethrows`, and `try?`/`try!`?",
    answer:
      "`throws` marks a function that can throw an error; callers must handle it with `do/catch` or propagate with `try`. `rethrows` marks a function that only throws if one of its closure parameters throws — so non-throwing callers don't need `try`. `try?` converts a throwing call into an optional (nil on error, discarding the error). `try!` force-unwraps the result and crashes if an error is thrown — use only when you can prove it won't.",
    keyPoints: ["throws propagates", "rethrows only if closure throws", "try? optional on error", "try! crashes", "do catch"],
  },
  {
    id: "sf-15",
    topic: "Swift Fundamentals",
    difficulty: "Advanced",
    question: "What is a `@resultBuilder` and where is it used?",
    answer:
      "A result builder (`@resultBuilder`) is a type that implements static methods like `buildBlock`, `buildOptional`, and `buildEither` to transform a sequence of statements in a closure into a single aggregated value. It powers SwiftUI's `ViewBuilder` — letting you list child views in a `body` without commas or explicit array construction — and libraries like SwiftData queries or regex builders. The compiler rewrites the DSL-like closure into calls to your builder methods.",
    keyPoints: ["resultBuilder", "buildBlock", "DSL", "ViewBuilder", "compiler rewrites", "aggregate statements"],
  },

  // ───────────────────────── Optionals ─────────────────────────
  {
    id: "opt-5",
    topic: "Optionals",
    difficulty: "Advanced",
    question: "What is the difference between `guard let` and `if let`, and when is each preferable?",
    answer:
      "`if let` binds an unwrapped value inside the braces — its scope is limited to that block. `guard let` binds a value that stays in scope for the rest of the enclosing function, but requires an `else` that must exit the scope (return, throw, break, continue). `guard` is preferred for early-exit validation at the top of a function because it keeps the happy path un-nested and the bound values usable afterward. Use `if let` when the unwrapped value is only needed locally.",
    keyPoints: ["if let local scope", "guard let function scope", "guard else must exit", "early exit", "un-nested happy path"],
  },
  {
    id: "opt-6",
    topic: "Optionals",
    difficulty: "Intermediate",
    question: "What does the nil-coalescing operator do, and how does it short-circuit?",
    answer:
      "`a ?? b` returns `a`'s unwrapped value if `a` is non-nil, otherwise `b`. The right side is only evaluated when the left is nil (short-circuiting), so `expensiveDefault()` in `value ?? expensiveDefault()` doesn't run if `value` exists. It can be chained (`a ?? b ?? c`) and the result type is non-optional when the final default is non-optional. It's the idiomatic way to provide a fallback without an explicit `if`.",
    keyPoints: ["fallback default", "right side only if nil", "short-circuit", "chainable", "non-optional result"],
  },

  // ───────────────────────── Value & Reference Types ─────────────────────────
  {
    id: "vr-4",
    topic: "Value & Reference Types",
    difficulty: "Intermediate",
    question: "Why can a `let` array be mutated element-by-element in some languages but not in Swift?",
    answer:
      "In Swift, `Array` is a value type, so a `let` array is fully immutable — you can't append, remove, or reassign elements. Declaring it `var` makes the whole value mutable. This differs from reference-type collections (like NSArray/NSMutableArray or Java's ArrayList) where `let`/`final` only fixes the reference, not the contents. Swift's value semantics mean immutability of the binding equals immutability of the data.",
    keyPoints: ["Array value type", "let fully immutable", "var mutable", "vs reference collections", "binding equals data"],
  },
  {
    id: "vr-5",
    topic: "Value & Reference Types",
    difficulty: "Advanced",
    question: "How do you get reference-like shared state with a struct, and when would you?",
    answer:
      "Wrap a class instance inside the struct (a common pattern for copy-on-write buffers), or store the shared state in a reference type the struct holds. You'd do this deliberately for COW storage optimization, or accidentally create a bug where copies of a 'value type' unexpectedly share mutable state through an embedded class. The lesson: a struct is only a true value type if all its stored properties are value types; an embedded reference shares identity across copies.",
    keyPoints: ["embed class in struct", "copy-on-write buffer", "shared mutable state", "value type only if all properties value", "identity shared"],
  },

  // ───────────────────────── Memory Management ─────────────────────────
  {
    id: "mem-5",
    topic: "Memory Management",
    difficulty: "Advanced",
    question: "Why should delegates usually be declared `weak`, and what happens if they aren't?",
    answer:
      "A view controller often owns an object (e.g. a data source) and sets itself as that object's delegate. If the delegate property is `strong`, you get a retain cycle: the controller retains the object, the object retains the controller back, and neither deallocates. Declaring `weak var delegate` breaks the cycle. This requires the delegate protocol to be class-bound (`protocol X: AnyObject`) because `weak` only applies to reference types.",
    keyPoints: ["retain cycle", "controller and object retain each other", "weak delegate breaks it", "AnyObject class-bound", "weak reference types only"],
  },
  {
    id: "mem-6",
    topic: "Memory Management",
    difficulty: "Advanced",
    question: "What is a capture list `[weak self]` vs `[unowned self]`, and how do you use the weak-strong dance?",
    answer:
      "In an escaping closure, `[weak self]` captures self as an optional weak reference so the closure doesn't keep self alive; `[unowned self]` captures a non-optional non-owning reference that crashes if self is gone. The 'weak-strong dance' re-establishes a strong reference for the closure body: `guard let self = self else { return }`, ensuring self stays alive for the duration of that execution without creating a permanent cycle. Use `weak` when self may legitimately deallocate; `unowned` only when it can't.",
    keyPoints: ["weak self optional", "unowned self crashes if gone", "weak-strong dance", "guard let self", "escaping closure cycle"],
  },
  {
    id: "mem-7",
    topic: "Memory Management",
    difficulty: "Intermediate",
    question: "What is autorelease and when does it matter in modern Swift?",
    answer:
      "Autorelease defers the release of an object until the surrounding autorelease pool drains (typically at the end of the current run loop iteration). In tight loops that create many temporary autoreleased objects — often bridged Foundation/Objective-C APIs like image processing — memory can balloon before the pool drains. Wrapping the loop body in `autoreleasepool { }` drains it each iteration, capping peak memory. Pure Swift objects use ARC directly and rarely need this, but Cocoa interop still can.",
    keyPoints: ["deferred release", "autorelease pool drains", "run loop", "tight loop memory spike", "autoreleasepool block", "Cocoa interop"],
  },

  // ───────────────────────── Closures ─────────────────────────
  {
    id: "cl-4",
    topic: "Closures",
    difficulty: "Intermediate",
    question: "What is a trailing closure and what is multiple trailing closure syntax?",
    answer:
      "If a function's last parameter is a closure, you can write it outside the parentheses as a trailing closure for readability (`items.map { $0 * 2 }`). Since Swift 5.3, if there are multiple closure parameters you can use multiple trailing closures: the first is unlabeled after the parens and the rest are labeled (`UIView.animate(withDuration: 1) { ... } completion: { _ in ... }`). This makes callback-heavy APIs read cleanly.",
    keyPoints: ["last param closure", "outside parens", "multiple trailing closures", "first unlabeled rest labeled", "readability"],
  },
  {
    id: "cl-5",
    topic: "Closures",
    difficulty: "Advanced",
    question: "What is the difference between a closure capturing a value by reference vs by copy?",
    answer:
      "By default, a closure captures variables by reference — it sees and can mutate the current value of a captured `var`, and observes later changes. To capture a snapshot of the value at definition time, list it in the capture list (`[x]`), which copies value types by value. This matters in loops: `for i in 0..<3 { closures.append { print(i) } }` — with `[i]` each closure prints its own 0/1/2; without careful handling you can capture shared mutable state.",
    keyPoints: ["reference by default", "sees later changes", "capture list copies value", "snapshot at definition", "loop capture pitfall"],
  },

  // ───────────────────────── Protocols & Generics ─────────────────────────
  {
    id: "pg-5",
    topic: "Protocols & Generics",
    difficulty: "Intermediate",
    question: "What is the difference between `Equatable`, `Hashable`, `Comparable`, and `Identifiable`?",
    answer:
      "`Equatable` requires `==` (are two values equal). `Hashable` extends Equatable and adds `hash(into:)`, letting a type be a Set element or Dictionary key. `Comparable` adds ordering (`<`), enabling sorting. `Identifiable` requires an `id` property for stable identity — used by SwiftUI's `List`/`ForEach` to track items across updates. Swift can synthesize Equatable and Hashable for structs/enums whose members already conform.",
    keyPoints: ["Equatable ==", "Hashable hash Set key", "Comparable ordering sort", "Identifiable id", "synthesized conformance"],
  },
  {
    id: "pg-6",
    topic: "Protocols & Generics",
    difficulty: "Advanced",
    question: "What is type erasure and why is `AnyView` or `AnyPublisher` needed?",
    answer:
      "Protocols with associated types (or `Self` requirements) can't be used as concrete types, and generic types expose their type parameters in signatures, which can leak implementation details or prevent storing heterogeneous values. Type erasure wraps the underlying type in a concrete box that forwards calls, hiding the specific type. `AnyView` erases a SwiftUI view's concrete type; `AnyPublisher` erases a Combine publisher's chain. The cost is losing compile-time specialization and some performance.",
    keyPoints: ["associated types can't be concrete", "wrap in box", "hide underlying type", "AnyView AnyPublisher", "loses specialization"],
  },
  {
    id: "pg-7",
    topic: "Protocols & Generics",
    difficulty: "Advanced",
    question: "What is the difference between generic constraints with `where` clauses and protocol composition?",
    answer:
      "Protocol composition (`A & B`) requires a value to conform to multiple protocols at once, used as a type. A `where` clause on a generic adds constraints on the type parameters or their associated types — e.g. `func f<T>(_ x: T) where T: Collection, T.Element: Equatable`. `where` is more expressive: it can constrain associated types and express relationships between multiple type parameters, which composition alone cannot. Conditional conformance (`extension Array: X where Element: X`) also uses `where`.",
    keyPoints: ["composition A & B multiple protocols", "where constrains type params", "associated type constraints", "relationships between params", "conditional conformance"],
  },

  // ───────────────────────── Concurrency ─────────────────────────
  {
    id: "con-8",
    topic: "Concurrency",
    difficulty: "Intermediate",
    question: "What is the difference between `async let` and a `TaskGroup`?",
    answer:
      "`async let` binds a fixed, statically-known number of concurrent child tasks — you write one binding per task and `await` them where you use the results. A `TaskGroup` runs a dynamic number of child tasks (e.g. one per element in a collection) added in a loop, collecting results as they finish. Both are structured concurrency: children can't outlive the scope, and errors/cancellation propagate. Use `async let` for a handful of known parallel calls, TaskGroup for a variable count.",
    keyPoints: ["async let fixed known count", "TaskGroup dynamic count", "structured concurrency", "child tasks", "await results"],
  },
  {
    id: "con-9",
    topic: "Concurrency",
    difficulty: "Intermediate",
    question: "What is `Task { }` and how does it differ from `Task.detached { }`?",
    answer:
      "`Task { }` creates an unstructured task that inherits the current actor context, priority, and task-local values — so a `Task` started in a `@MainActor` context runs its body on the main actor by default. `Task.detached { }` creates a task with no inherited context: no actor isolation, default priority, no task-locals — it always runs off the current actor. Prefer plain `Task` so inheritance keeps UI code on the main actor; reach for `detached` only when you deliberately want to escape the current context.",
    keyPoints: ["Task inherits context", "actor priority task-locals", "detached inherits nothing", "runs off current actor", "prefer plain Task"],
  },
  {
    id: "con-10",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "What is an `AsyncSequence` and how do you consume one?",
    answer:
      "An `AsyncSequence` produces elements asynchronously over time, consumed with `for await element in sequence`. Each iteration can suspend until the next element is ready — ideal for streams like network bytes (`URLSession.bytes`), notifications, or a custom `AsyncStream` you feed from a callback. It supports async versions of `map`, `filter`, etc. Iteration can throw and can be cancelled; breaking out of the loop or task cancellation stops consumption cleanly.",
    keyPoints: ["elements over time", "for await in", "suspends per element", "AsyncStream", "URLSession.bytes", "cancellable"],
  },
  {
    id: "con-11",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "How do you bridge a completion-handler API into async/await?",
    answer:
      "Use `withCheckedContinuation` (or `withCheckedThrowingContinuation` for throwing APIs). You wrap the callback-based call and resume the continuation exactly once with the result or error: `try await withCheckedThrowingContinuation { cont in api.load { result in cont.resume(with: result) } }`. The rule is critical — resuming zero times leaks/hangs the task forever, resuming more than once crashes. The 'checked' variants trap misuse at runtime; `withUnsafeContinuation` skips the checks for performance.",
    keyPoints: ["withCheckedContinuation", "wrap callback", "resume exactly once", "resume twice crashes", "resume zero hangs", "throwing variant"],
  },
  {
    id: "con-12",
    topic: "Concurrency",
    difficulty: "Advanced",
    question: "What does `@MainActor` do and how does it differ from `DispatchQueue.main.async`?",
    answer:
      "`@MainActor` is a global actor that guarantees the annotated type, function, or property runs on the main thread, enforced by the compiler — cross-actor calls are `await`ed and the compiler catches unsafe access at build time. `DispatchQueue.main.async` is a runtime hop with no compile-time guarantees; forget it on one path and you get a hard-to-find threading bug. `@MainActor` moves main-thread safety from a runtime convention into the type system, which is why UI-facing code (view models, SwiftUI views) is increasingly annotated with it.",
    keyPoints: ["MainActor global actor", "compiler enforced", "main thread guarantee", "DispatchQueue runtime hop", "no compile-time check", "type system safety"],
  },

  // ───────────────────────── SwiftUI ─────────────────────────
  {
    id: "su-6",
    topic: "SwiftUI",
    difficulty: "Beginner",
    question: "What is the difference between a `VStack`, `LazyVStack`, and `List`?",
    answer:
      "`VStack` lays out all its children eagerly and immediately — fine for a small, fixed number of views. `LazyVStack` (inside a `ScrollView`) only creates child views as they scroll into view, so it scales to large data without building everything up front. `List` is the highest-level container: lazy by default, adds platform styling, separators, swipe actions, selection, and section support. Use `List` for data-driven scrollable content, `LazyVStack` when you need custom scroll layout, `VStack` for small static groups.",
    keyPoints: ["VStack eager small", "LazyVStack lazy on scroll", "List lazy styled features", "swipe selection sections", "large data"],
  },
  {
    id: "su-7",
    topic: "SwiftUI",
    difficulty: "Intermediate",
    question: "How do `.onAppear`, `.task`, and `init` differ for loading data in a SwiftUI view?",
    answer:
      "`init` runs whenever the view struct is re-created (which can be very often, since views are cheap value types) — never do side effects or data loading there. `.onAppear` runs when the view appears on screen; it's synchronous and can fire multiple times (e.g. navigating back). `.task` runs an async job tied to the view's lifetime — it starts when the view appears and is automatically cancelled when the view disappears, making it the modern choice for async loading without manual cancellation.",
    keyPoints: ["init runs often no side effects", "onAppear on screen synchronous", "task async lifetime-tied", "auto cancelled on disappear", "modern async loading"],
  },
  {
    id: "su-8",
    topic: "SwiftUI",
    difficulty: "Intermediate",
    question: "What is the role of the `id` in `ForEach` and what bugs come from getting it wrong?",
    answer:
      "SwiftUI uses each item's identity to diff the list across updates — deciding which rows to insert, delete, move, or update, and preserving per-row state (like a text field's contents) across reorders. Stable identity comes from `Identifiable` or an explicit `id:` key path. Using array indices as ids, or a non-unique/unstable id, causes wrong animations, state bleeding between rows, and broken deletions. The id must be stable and unique for the item's lifetime.",
    keyPoints: ["identity diffs list", "insert delete move", "preserve per-row state", "index id causes bugs", "state bleeding", "stable unique"],
  },
  {
    id: "su-9",
    topic: "SwiftUI",
    difficulty: "Advanced",
    question: "What is `GeometryReader` and why should you use it sparingly?",
    answer:
      "`GeometryReader` exposes the size and coordinate space of its container via a `GeometryProxy`, letting you build layouts that depend on available space. The catch: it greedily takes all offered space and returns a flexible frame, which can disrupt the surrounding layout and cause sizing surprises; it also re-evaluates its closure on every size change. Prefer layout modifiers, `Layout` protocol, or `containerRelativeFrame` when possible, and confine GeometryReader to the smallest subtree that actually needs measurement.",
    keyPoints: ["GeometryProxy size coordinate space", "takes all offered space", "flexible frame disrupts layout", "re-evaluates on change", "confine to small subtree"],
  },
  {
    id: "su-10",
    topic: "SwiftUI",
    difficulty: "Advanced",
    question: "What is `PreferenceKey` and what problem does it solve?",
    answer:
      "SwiftUI data normally flows top-down (parent to child) via the environment and bindings. A `PreferenceKey` lets a child pass data back up to an ancestor — for example a child reporting its measured size or a computed anchor. The child sets a preference with `.preference(key:value:)`, and an ancestor reads it with `.onPreferenceChange` or `.overlayPreferenceValue`. It's the mechanism behind things like custom tab bars that need to know a selected item's frame, solving the otherwise one-directional data flow.",
    keyPoints: ["child to parent data", "reverse of top-down flow", "preference modifier", "onPreferenceChange", "report size or anchor"],
  },

  // ───────────────────────── UIKit ─────────────────────────
  {
    id: "uk-5",
    topic: "UIKit",
    difficulty: "Beginner",
    question: "What is the difference between `frame` and `bounds` of a UIView?",
    answer:
      "`frame` describes a view's position and size in its superview's coordinate system. `bounds` describes the view's own internal coordinate system — its origin is usually `(0,0)` and its size matches the frame's size (absent transforms). Changing `bounds.origin` scrolls the view's content (how scroll views work). When a view is rotated with a transform, `frame` becomes the bounding box of the transformed view and can be misleading, while `bounds` stays constant.",
    keyPoints: ["frame in superview coords", "bounds own coord system", "bounds origin scrolls content", "transform affects frame", "bounds constant"],
  },
  {
    id: "uk-6",
    topic: "UIKit",
    difficulty: "Intermediate",
    question: "What is the responder chain in UIKit?",
    answer:
      "The responder chain is the ordered list of `UIResponder` objects (views, view controllers, the window, the app delegate) that events and actions travel up when the first responder doesn't handle them. A touch or action message starts at the first responder (e.g. the tapped view) and propagates up the hierarchy until something handles it or it's dropped. It powers `target: nil` actions (`sendAction`), keyboard/menu handling, and `becomeFirstResponder`/`resignFirstResponder` for text input focus.",
    keyPoints: ["UIResponder chain", "events travel up", "first responder", "propagates until handled", "target nil actions", "becomeFirstResponder"],
  },
  {
    id: "uk-7",
    topic: "UIKit",
    difficulty: "Advanced",
    question: "What is `UITableViewDiffableDataSource` and why is it preferred over the classic data source?",
    answer:
      "A diffable data source manages a table/collection view by applying `NSDiffableDataSourceSnapshot`s — you describe the desired state (sections and item identifiers) and it computes and animates the exact inserts, deletes, and moves for you. This eliminates the classic pitfall of manually calling `insertRows`/`deleteRows` in sync with your model, which crashes with 'inconsistent data' if counts mismatch. It requires `Hashable` section and item identifiers and makes updates declarative and crash-resistant.",
    keyPoints: ["snapshot describes state", "computes diff automatically", "animates inserts deletes moves", "no manual insert/delete crashes", "Hashable identifiers", "declarative"],
  },

  // ───────────────────────── Architecture & Patterns ─────────────────────────
  {
    id: "arch-6",
    topic: "Architecture & Patterns",
    difficulty: "Intermediate",
    question: "What is the difference between MVVM and VIPER?",
    answer:
      "MVVM has three roles — Model, View, and ViewModel — and relies on binding between view and view model; it's lightweight and pairs naturally with SwiftUI/Combine. VIPER splits responsibilities into five: View, Interactor (business logic), Presenter (formatting/coordination), Entity (model), and Router (navigation). VIPER enforces stronger separation and testability for very large teams/codebases but adds boilerplate and indirection. MVVM is usually enough for most apps; VIPER suits large modular projects with strict layering.",
    keyPoints: ["MVVM three roles binding", "VIPER five roles", "Interactor Presenter Router", "VIPER more separation boilerplate", "MVVM lighter"],
  },
  {
    id: "arch-7",
    topic: "Architecture & Patterns",
    difficulty: "Advanced",
    question: "What is a unidirectional data flow architecture (e.g. Redux/TCA) and what are its benefits?",
    answer:
      "Unidirectional data flow keeps a single source of truth (State), mutated only by a pure reducer in response to Actions, with side effects isolated in a controlled layer (Effects). The view renders from state and dispatches actions; data flows one way: action → reducer → new state → view. Benefits are predictability, testability (reducers are pure functions), time-travel debugging, and easy state restoration. The cost is boilerplate and a learning curve. The Composable Architecture (TCA) is the popular Swift implementation.",
    keyPoints: ["single source of truth state", "pure reducer", "actions mutate state", "effects isolated", "one-way flow", "testable predictable", "TCA"],
  },
  {
    id: "arch-8",
    topic: "Architecture & Patterns",
    difficulty: "Intermediate",
    question: "What is the difference between the delegate pattern and closures/callbacks for communication?",
    answer:
      "Both let one object notify another. Delegation uses a protocol and a (usually weak) delegate reference — good for a persistent one-to-one relationship with several related callbacks (e.g. UITableViewDelegate). Closures/callbacks are lighter for a single, localized callback and keep the calling code together, but you must manage capture semantics to avoid retain cycles. Rule of thumb: many related events over a long-lived relationship → delegate; a one-off result or single event → closure.",
    keyPoints: ["delegate protocol weak", "many related callbacks", "closure single localized", "capture cycle risk", "one-to-one vs one-off"],
  },

  // ───────────────────────── Networking ─────────────────────────
  {
    id: "net-4",
    topic: "Networking",
    difficulty: "Intermediate",
    question: "How do you handle authentication tokens and refresh in a networking layer?",
    answer:
      "Store tokens securely in the Keychain (never UserDefaults). Attach the access token as an `Authorization: Bearer` header via a request adapter/interceptor. When a request returns 401, pause outgoing requests, use the refresh token to obtain a new access token, then retry the failed requests — serializing refresh so concurrent 401s don't trigger multiple refreshes. If refresh fails, log the user out. Keep this logic centralized in the networking layer, not scattered across call sites.",
    keyPoints: ["Keychain not UserDefaults", "Bearer header interceptor", "401 triggers refresh", "retry after refresh", "serialize concurrent refresh", "logout on failure"],
  },
  {
    id: "net-5",
    topic: "Networking",
    difficulty: "Advanced",
    question: "What is SSL pinning and when would you use it?",
    answer:
      "SSL/certificate pinning validates that the server's certificate (or public key) matches a copy embedded in the app, rather than trusting any CA-signed cert. It defends against man-in-the-middle attacks where an attacker installs a rogue trusted root (e.g. on a compromised or proxied network). You implement it in `URLSessionDelegate`'s `didReceive challenge` by comparing the server trust's certificate/public key against your pinned value. The trade-off: certificate rotation requires an app update, so pin the public key or use backup pins.",
    keyPoints: ["validate server cert against embedded copy", "defends MITM", "URLSessionDelegate challenge", "public key pinning", "rotation needs app update", "backup pins"],
  },
  {
    id: "net-6",
    topic: "Networking",
    difficulty: "Intermediate",
    question: "What HTTP status code ranges should a client handle, and how?",
    answer:
      "2xx is success (200 OK, 201 Created, 204 No Content — decode or treat as empty). 3xx is redirection (usually handled by URLSession automatically). 4xx is client error: 400 bad request, 401 unauthorized (refresh/login), 403 forbidden, 404 not found, 429 too many requests (back off / respect Retry-After). 5xx is server error (500, 502, 503) — safe to retry with exponential backoff. Always read the actual status from `HTTPURLResponse.statusCode`; a non-nil `data` doesn't mean success.",
    keyPoints: ["2xx success", "4xx client error 401 429", "5xx server retry backoff", "429 Retry-After", "check HTTPURLResponse statusCode"],
  },

  // ───────────────────────── Persistence ─────────────────────────
  {
    id: "per-4",
    topic: "Persistence",
    difficulty: "Intermediate",
    question: "What is SwiftData and how does it relate to Core Data?",
    answer:
      "SwiftData (iOS 17+) is Apple's modern persistence framework built on top of Core Data's engine but with a Swift-first, declarative API. You annotate a plain class with `@Model` and it becomes persistable; you query with `@Query` in SwiftUI and mutate via a `ModelContext`. It removes the `.xcdatamodeld` editor and much boilerplate, integrates tightly with SwiftUI, and interoperates with Core Data. For apps that must support iOS 16 or need advanced Core Data features not yet exposed, Core Data remains the choice.",
    keyPoints: ["iOS 17 modern", "built on Core Data engine", "@Model @Query", "ModelContext", "declarative Swift-first", "SwiftUI integration"],
  },
  {
    id: "per-5",
    topic: "Persistence",
    difficulty: "Intermediate",
    question: "Why is the Keychain used for sensitive data instead of UserDefaults?",
    answer:
      "UserDefaults stores data as an unencrypted plist in the app's sandbox — readable from a backup or a jailbroken device — so it must never hold passwords, tokens, or secrets. The Keychain is an encrypted, OS-managed secure store with hardware-backed protection, per-item access control (e.g. require device unlock or biometrics), and accessibility classes controlling when items are readable. Use it for credentials, tokens, and encryption keys; UserDefaults is for non-sensitive preferences only.",
    keyPoints: ["UserDefaults unencrypted plist", "readable from backup", "Keychain encrypted OS-managed", "access control biometrics", "accessibility classes", "tokens credentials"],
  },
  {
    id: "per-6",
    topic: "Persistence",
    difficulty: "Advanced",
    question: "How do you perform a lightweight Core Data migration?",
    answer:
      "When the data model changes, Core Data needs to migrate existing stores. Lightweight (automatic) migration handles simple changes — adding/removing attributes or entities, renaming via a renaming identifier — by inferring the mapping. You enable it by setting `shouldMigrateStoreAutomatically` and `shouldInferMappingModelAutomatically` to true on the store description (the default for `NSPersistentContainer`). For complex changes (splitting entities, transforming data), you provide a custom mapping model and possibly an `NSEntityMigrationPolicy`. Always version the model with a new model version.",
    keyPoints: ["model change needs migration", "lightweight infers mapping", "add remove rename attributes", "shouldInferMappingModelAutomatically", "custom mapping for complex", "version the model"],
  },

  // ───────────────────────── Testing ─────────────────────────
  {
    id: "test-4",
    topic: "Testing",
    difficulty: "Intermediate",
    question: "What is the difference between unit tests, integration tests, and UI tests?",
    answer:
      "Unit tests verify a single isolated component (a function or type) quickly with dependencies mocked. Integration tests verify that multiple components work together — e.g. a repository calling a real (or in-memory) database, or a networking layer decoding a real response — so they're slower and catch wiring bugs unit tests miss. UI tests (XCUITest) drive the actual app through the accessibility layer, tapping and typing like a user, to verify end-to-end flows; they're the slowest and most brittle. A healthy suite is mostly unit tests (the test pyramid).",
    keyPoints: ["unit isolated fast mocked", "integration components together", "UI XCUITest end-to-end", "slowest most brittle", "test pyramid"],
  },
  {
    id: "test-5",
    topic: "Testing",
    difficulty: "Advanced",
    question: "How do you make code testable that depends on the current date, network, or randomness?",
    answer:
      "Inject the nondeterministic dependency behind a protocol instead of calling it directly. For dates, inject a `() -> Date` clock or a `DateProvider`; in tests supply a fixed date. For network, inject a `URLSession` (or a `URLProtocol` stub) so tests return canned responses without hitting the wire. For randomness, inject a `RandomNumberGenerator` (Swift lets you pass a seeded one). The principle: push the impure boundary to the edges and pass it in, so tests control it and results are deterministic.",
    keyPoints: ["inject behind protocol", "date provider clock", "URLProtocol stub network", "seeded RandomNumberGenerator", "control at boundary", "deterministic"],
  },
  {
    id: "test-6",
    topic: "Testing",
    difficulty: "Intermediate",
    question: "What is the difference between XCTest and the newer Swift Testing framework?",
    answer:
      "XCTest is the long-standing framework: subclass `XCTestCase`, name methods `test...`, and use the `XCTAssert` family. Swift Testing (introduced 2024) is a modern macro-based framework: mark tests with `@Test` (any function, including in structs), assert with `#expect` and `#require`, parameterize tests with arguments, and use `Suite`s and tags for organization. It gives clearer failure messages, better async support, and parallel execution by default. Both can coexist in a project; UI tests still use XCTest/XCUITest.",
    keyPoints: ["XCTest XCTestCase XCTAssert", "Swift Testing macros @Test", "#expect #require", "parameterized tests", "clearer messages parallel", "coexist"],
  },

  // ───────────────────────── Combine ─────────────────────────
  {
    id: "comb-1",
    topic: "Combine",
    difficulty: "Beginner",
    question: "What are Publishers, Subscribers, and Operators in Combine?",
    answer:
      "Combine is Apple's declarative reactive framework. A Publisher emits a stream of values (and a completion or failure) over time. A Subscriber receives them (e.g. via `sink` or `assign`). Operators sit between them, transforming the stream — `map`, `filter`, `debounce`, `combineLatest`, etc. — each returning a new publisher. You compose a pipeline from a publisher through operators to a subscriber, and you keep the returned `AnyCancellable` alive (usually in a `Set<AnyCancellable>`) or the subscription is torn down.",
    keyPoints: ["Publisher emits values over time", "Subscriber sink assign", "Operators transform", "compose pipeline", "AnyCancellable stored", "reactive declarative"],
  },
  {
    id: "comb-2",
    topic: "Combine",
    difficulty: "Intermediate",
    question: "What is the difference between `PassthroughSubject` and `CurrentValueSubject`?",
    answer:
      "Both are subjects — publishers you can imperatively send values into with `.send(_:)`. A `PassthroughSubject` has no notion of a current value: subscribers only receive values sent after they subscribe. A `CurrentValueSubject` holds a current value, exposes it via `.value`, and immediately delivers that current value to each new subscriber before subsequent updates. Use CurrentValueSubject for state that has a 'now' value (like a view model property), PassthroughSubject for discrete events (like a button tap).",
    keyPoints: ["subjects send imperatively", "Passthrough no current value", "only after subscribe", "CurrentValue holds value replays", "state vs events"],
  },
  {
    id: "comb-3",
    topic: "Combine",
    difficulty: "Advanced",
    question: "How do you avoid memory leaks and retain cycles with Combine subscriptions?",
    answer:
      "Store cancellables in a `Set<AnyCancellable>` owned by the object; when that object deallocates, the set drains and subscriptions cancel automatically. In `sink`/closures that reference `self`, use `[weak self]` to avoid a cycle where self holds the cancellable and the closure holds self. Avoid subscribing without storing the cancellable (it cancels immediately) or storing it somewhere longer-lived than intended (it leaks). `assign(to:on:)` captures the target strongly, so prefer `assign(to: &$published)` or a weak sink for self.",
    keyPoints: ["store in Set AnyCancellable", "drains on dealloc", "weak self in sink", "cycle self holds cancellable", "assign captures strongly", "assign to &$published"],
  },
  {
    id: "comb-4",
    topic: "Combine",
    difficulty: "Intermediate",
    question: "When would you choose Combine vs async/await?",
    answer:
      "async/await excels at one-shot asynchronous operations with a single result (a network call, a file read) — straight-line code with structured concurrency and cancellation. Combine excels at streams of values over time and reactive composition — debouncing search text, combining multiple UI inputs, observing `@Published` properties, or reacting to notifications. Many codebases use async/await for imperative flows and Combine (or the newer `AsyncSequence`/Observation) for continuous streams. Apple is steering new APIs toward async/await and Observation, so Combine's role is narrowing.",
    keyPoints: ["async/await one-shot result", "Combine streams over time", "debounce combineLatest @Published", "reactive composition", "async trend Observation"],
  },

  // ───────────────────────── Swift 6 & Data Races ─────────────────────────
  {
    id: "s6-1",
    topic: "Swift 6 & Data Races",
    difficulty: "Intermediate",
    question: "What is the `Sendable` protocol and why does it matter?",
    answer:
      "`Sendable` marks a type as safe to pass across concurrency boundaries (between actors or into a `Task`) without introducing data races. Value types made of Sendable members are implicitly Sendable; final classes with only immutable state can be marked Sendable; classes with mutable state generally can't be unless they protect it (e.g. with a lock) and are marked `@unchecked Sendable`. In Swift 6's strict concurrency, the compiler enforces that only Sendable values cross those boundaries, turning potential data races into compile errors.",
    keyPoints: ["safe across concurrency boundaries", "value types implicit", "immutable final class", "@unchecked Sendable with lock", "compiler enforces", "prevents data races"],
  },
  {
    id: "s6-2",
    topic: "Swift 6 & Data Races",
    difficulty: "Advanced",
    question: "What does Swift 6's strict concurrency checking change compared to Swift 5?",
    answer:
      "Swift 6 makes data-race safety a compile-time guarantee. It enforces actor isolation and `Sendable` conformance across all concurrency boundaries — accessing actor-isolated state from outside without `await`, or capturing non-Sendable values in a `Task`, becomes an error rather than a latent runtime bug. You can adopt it incrementally: enable 'complete' strict-concurrency checking as warnings in Swift 5 mode, fix them, then switch to the Swift 6 language mode. The payoff is eliminating an entire class of hard-to-reproduce threading bugs at build time.",
    keyPoints: ["data-race safety at compile time", "enforces actor isolation Sendable", "errors not runtime bugs", "incremental adoption warnings", "complete checking", "Swift 6 language mode"],
  },
  {
    id: "s6-3",
    topic: "Swift 6 & Data Races",
    difficulty: "Advanced",
    question: "What is actor isolation and what is a 'nonisolated' member?",
    answer:
      "An actor's mutable state is isolated: it can only be touched synchronously from inside the actor; outside callers must `await`, and the runtime serializes access so there are no data races. Marking a member `nonisolated` opts it out of that isolation — it can't access the actor's mutable state but can be called synchronously from anywhere (useful for computed properties over immutable data, or `Hashable`/`Sendable` conformances). `nonisolated` is how you expose safe, isolation-free functionality on an actor without forcing every caller to await.",
    keyPoints: ["actor state isolated", "outside must await", "serialized access no races", "nonisolated opts out", "no mutable state access", "sync from anywhere"],
  },
  {
    id: "s6-4",
    topic: "Swift 6 & Data Races",
    difficulty: "Advanced",
    question: "What is the `@Observable` macro and how does it change view-model code vs `ObservableObject`?",
    answer:
      "`@Observable` (Observation framework, iOS 17+) is a macro you apply to a class so SwiftUI tracks which properties a view actually reads and re-renders only when those change. Compared to `ObservableObject`: you drop `@Published` on each property, you don't need `@ObservedObject`/`@StateObject` wrappers just to observe (a plain `@State` or property reference works, with `@Bindable` for bindings), and invalidation is per-property rather than 'any published change re-renders everyone.' The result is less boilerplate and fewer unnecessary view updates.",
    keyPoints: ["Observation macro iOS 17", "per-property tracking", "drop @Published", "no @ObservedObject needed", "@Bindable for bindings", "fewer re-renders"],
  },

  // ───────────────────────── Performance ─────────────────────────
  {
    id: "perf-1",
    topic: "Performance",
    difficulty: "Intermediate",
    question: "How would you diagnose and fix a laggy scrolling table or collection view?",
    answer:
      "Profile with Instruments' Time Profiler and the Core Animation/Animation Hitches tools to find where frame time goes. Common causes: doing expensive work (image decoding, date formatting, layout math) synchronously in `cellForRowAt`; not reusing cells; triggering offscreen rendering with shadows/masks/`cornerRadius` on large views; or blocking the main thread with sync I/O. Fixes: move heavy work off the main thread and cache results, decode/resize images in the background, precompute cell heights, avoid transparency and expensive layer effects, and reuse cells properly.",
    keyPoints: ["Time Profiler Core Animation", "heavy work in cellForRowAt", "cache decode images background", "offscreen rendering shadows", "reuse cells", "main thread blocking"],
  },
  {
    id: "perf-2",
    topic: "Performance",
    difficulty: "Advanced",
    question: "What causes app launch to be slow and how do you improve it?",
    answer:
      "Launch splits into pre-main (dynamic linker loading dylibs, ObjC/Swift runtime setup, static initializers) and post-main (app delegate, first frame). Slow launches come from too many dynamic frameworks, heavy `+load`/static initializers, synchronous work in `didFinishLaunching` (network, disk, database setup), and building a complex first screen. Improvements: reduce/merge dynamic frameworks, defer non-critical setup off the launch path (lazy initialization), do I/O asynchronously, and keep the initial UI light. Measure with Instruments' App Launch template and `DYLD_PRINT_STATISTICS`.",
    keyPoints: ["pre-main dylibs static init", "post-main didFinishLaunching first frame", "too many dynamic frameworks", "defer non-critical work", "async I/O", "App Launch instrument"],
  },
  {
    id: "perf-3",
    topic: "Performance",
    difficulty: "Advanced",
    question: "How do value types and copy-on-write help performance, and where can they hurt?",
    answer:
      "Value types avoid heap allocation and reference counting for small data, keep memory local, and eliminate aliasing bugs. Copy-on-write means large value collections (Array, Dictionary) share storage until mutated, so passing them around is cheap. Where they hurt: very large structs copied frequently across boundaries can cost more than a reference; a struct with many stored properties or embedded in a hot path may thrash. Diagnose with Instruments; if a large value type is copied a lot, consider a class or COW wrapper. Measure rather than assume.",
    keyPoints: ["value types no heap no refcount", "COW shares until mutation", "cheap passing", "large struct copies costly", "COW wrapper or class", "measure"],
  },

  // ───────────────────────── System Design ─────────────────────────
  {
    id: "sd-1",
    topic: "System Design",
    difficulty: "Advanced",
    question: "How would you design an offline-first feature (e.g. a notes app that syncs)?",
    answer:
      "Treat the local store as the source of truth: the UI reads and writes locally (Core Data/SwiftData/SQLite) so it works with no network. Queue mutations and sync them to the server when connectivity returns, using a background sync engine. Handle conflicts with a strategy — last-write-wins with timestamps, per-field merging, or CRDTs for collaborative edits. Track each record's sync state (pending/synced/failed), use monotonic version numbers or updated-at, and reconcile on push/pull. Observe reachability, retry with backoff, and surface sync status to the user.",
    keyPoints: ["local store source of truth", "queue mutations sync later", "conflict resolution last-write-wins", "sync state per record", "reachability retry backoff", "reconcile push pull"],
  },
  {
    id: "sd-2",
    topic: "System Design",
    difficulty: "Advanced",
    question: "How would you design an image loading and caching system (like SDWebImage/Kingfisher)?",
    answer:
      "Given a URL, check a two-tier cache: a fast in-memory `NSCache` (auto-evicts under pressure) keyed by URL, then a disk cache. On a miss, download asynchronously, decode/downsample off the main thread to the target display size, store in both caches, and deliver on the main thread. Deduplicate in-flight requests for the same URL, cancel downloads when a cell is reused (tie the request to the cell), respect cache expiration/HTTP headers, and cap memory/disk with an eviction policy. Expose a simple `setImage(url:)` API that handles placeholders and cancellation.",
    keyPoints: ["two-tier memory NSCache disk", "async download", "decode downsample off main", "dedupe in-flight", "cancel on cell reuse", "eviction policy"],
  },
  {
    id: "sd-3",
    topic: "System Design",
    difficulty: "Advanced",
    question: "How would you architect a large app for modularity and team scalability?",
    answer:
      "Split the app into feature modules (Swift packages or frameworks), each owning its UI, logic, and tests, depending only on abstraction layers — not on each other directly. Share cross-cutting concerns (networking, design system, persistence) as separate foundation modules. Use protocols and dependency injection at module boundaries so features are independently buildable and testable, and wire them at the app/composition-root layer. Benefits: faster incremental builds, clear ownership, enforced boundaries, and the ability for teams to work in parallel. Watch for over-modularization and circular dependencies.",
    keyPoints: ["feature modules Swift packages", "own UI logic tests", "shared foundation modules", "protocols DI at boundaries", "composition root wiring", "parallel teams faster builds"],
  },

  // ───────────────────────── Coding Practice ─────────────────────────
  {
    id: "code-7",
    topic: "Coding Practice",
    difficulty: "Beginner",
    question: "Count the frequency of each character in a string.",
    answer:
      "Iterate once and tally in a dictionary using `default` subscripting — O(n) time:\n\n```swift\nfunc frequencies(_ s: String) -> [Character: Int] {\n    var counts: [Character: Int] = [:]\n    for ch in s {\n        counts[ch, default: 0] += 1\n    }\n    return counts\n}\n```\n\nThe `[key, default: 0]` subscript reads 0 for a missing key and writes back the incremented value in one step. This pattern generalizes to grouping and counting problems (anagrams, most-frequent element).",
    keyPoints: ["dictionary tally", "default subscript", "O(n) one pass", "counts key default 0"],
  },
  {
    id: "code-8",
    topic: "Coding Practice",
    difficulty: "Intermediate",
    question: "Determine whether two strings are anagrams of each other.",
    answer:
      "Two strings are anagrams if they contain the same characters with the same counts. Fastest check: compare their character-frequency dictionaries, or (for the common case) compare sorted character arrays. Frequency approach is O(n); sorting is O(n log n):\n\n```swift\nfunc isAnagram(_ a: String, _ b: String) -> Bool {\n    guard a.count == b.count else { return false }\n    var counts: [Character: Int] = [:]\n    for ch in a { counts[ch, default: 0] += 1 }\n    for ch in b {\n        counts[ch, default: 0] -= 1\n        if counts[ch]! < 0 { return false }\n    }\n    return true\n}\n```\n\nClarify case sensitivity and whitespace handling first.",
    keyPoints: ["same characters same counts", "frequency dictionary", "O(n)", "increment then decrement", "clarify case whitespace"],
  },
  {
    id: "code-9",
    topic: "Coding Practice",
    difficulty: "Intermediate",
    question: "Find the first non-repeating character in a string.",
    answer:
      "Do two passes: first tally each character's count, then scan the string in order and return the first character whose count is 1. This is O(n) time; a single-pass frequency dictionary loses order, so the second ordered scan matters.\n\n```swift\nfunc firstUnique(_ s: String) -> Character? {\n    var counts: [Character: Int] = [:]\n    for ch in s { counts[ch, default: 0] += 1 }\n    for ch in s where counts[ch] == 1 { return ch }\n    return nil\n}\n```\n\nMention that iterating the String preserves original order, which the answer depends on.",
    keyPoints: ["two passes", "tally then ordered scan", "first count == 1", "O(n)", "order matters"],
  },
  {
    id: "code-10",
    topic: "Coding Practice",
    difficulty: "Advanced",
    question: "Implement a debounced/throttled function generically in Swift.",
    answer:
      "Debounce fires only after a quiet period; throttle fires at most once per interval. A reusable debouncer cancels its pending work item on each call:\n\n```swift\nfinal class Debouncer {\n    private let delay: TimeInterval\n    private var workItem: DispatchWorkItem?\n    init(delay: TimeInterval) { self.delay = delay }\n    func call(_ action: @escaping () -> Void) {\n        workItem?.cancel()\n        let item = DispatchWorkItem(block: action)\n        workItem = item\n        DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: item)\n    }\n}\n```\n\nThrottle instead records the last fire time and ignores calls until the interval elapses. Discuss where each fits: debounce for search-as-you-type, throttle for scroll/resize handlers.",
    keyPoints: ["debounce after quiet period", "throttle at most once per interval", "cancel pending work item", "asyncAfter", "search vs scroll use case"],
  },
  {
    id: "code-11",
    topic: "Coding Practice",
    difficulty: "Advanced",
    question: "Implement a generic LRU (least-recently-used) cache.",
    answer:
      "An LRU cache evicts the least-recently-used entry when it exceeds capacity. The classic O(1) design combines a hash map (key → node) with a doubly linked list ordered by recency: on access, move the node to the front; on insert past capacity, remove the tail. In Swift you can implement the linked list with class nodes, or, for an interview, approximate with a dictionary plus an ordered array of keys (O(n) on access but simpler to write). State the capacity, get, and put semantics, and that both operations aim for O(1) with the map + list design.",
    keyPoints: ["evict least recently used", "hash map plus doubly linked list", "O(1) get put", "move to front on access", "remove tail on overflow", "capacity"],
  },
  {
    id: "code-12",
    topic: "Coding Practice",
    difficulty: "Intermediate",
    question: "Group an array of objects by a key (e.g. group people by city).",
    answer:
      "Use `Dictionary(grouping:by:)`, which builds a `[Key: [Element]]` in one line and O(n):\n\n```swift\nlet byCity = Dictionary(grouping: people, by: { $0.city })\n```\n\nTo transform values (e.g. get just names per city), map over the grouped dictionary's values with `mapValues`. This is far cleaner than manually creating arrays inside a dictionary with `default` subscripting, though that manual approach is a good fallback to explain the underlying mechanics.",
    keyPoints: ["Dictionary grouping by", "Key to array of elements", "O(n) one line", "mapValues to transform", "vs manual default subscript"],
  },
];

// Convenience: unique count used by the landing UI.
export const questionCount = questions.length;
