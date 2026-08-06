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
];

// Convenience: unique count used by the landing UI.
export const questionCount = questions.length;
