
var snapshotAuxiliaryData = {}

function generateSnapshot() {
  //
  // <process>
  //
  function cannotAccess(proto, prop) {
    return function () {
      throw 'Cannot access ' + proto + '.' + prop + ' during snapshot creation'
    }
  }
  function getPrevent(proto, prop) {
    return {
      get: cannotAccess(proto, prop)
    }
  }

  let process = {}
  Object.defineProperties(process, {
    platform: {
      value: 'darwin',
      enumerable: false,
    },
    argv: {
      value: [],
      enumerable: false,
    },
    env: {
      value: {
        NODE_ENV: 'development',
      },
      enumerable: false,
    },
    version: {
      value: 'v14.16.0',
      enumerable: false,
    },
    versions: {
      value: { node: 'v14.16.0' },
      enumerable: false,
    },
    nextTick: getPrevent('process', 'nextTick')
  })

  function get_process() {
    return process
  }
  //
  // </process>
  //

  //
  // <globals>
  //
  const outerScope = this
  function createElement(_type) {
    return {
      innerHTML: '',
      style: {},
    }
  }
  
  let documentElement = {
    textContent: '',
    style: {
      cssFloat: '',
    },
  }
  let document = {}
  Object.defineProperties(document, {
    createElement: {
      value: createElement,
      enumerable: false,
    },
    addEventListener: {
      value: function () {},
      enumerable: false,
    },
    documentElement: {
      value: documentElement,
      enumerable: false,
    },
    oninput: {
      value: {},
      enumerable: false,
    },
    onchange: {
      value: {},
      enumerable: false,
    },
  })
  
  function get_document() {
    return document
  }
  
  let global = {}
  Object.defineProperties(global, {
    document: {
      value: document,
      enumerable: false,
    },
    process: {
      value: process,
      enumerable: false,
    },
    WeakMap: {
      value: WeakMap,
      enumerable: false,
    },
    isGeneratingSnapshot: {
      value: true,
      enumerable: false,
    },
  })
  
  function get_global() {
    return global
  } // Globally visible function and constructor names that are available in an Electron renderer window, but not visible
  // during snapshot creation.
  // See test/samples/list-globals.js for the generation code.
  // - Manually remove "webkitURL" which is deprecated to avoid a warning on startup.
  
  const globalFunctionNames = [
    'USBOutTransferResult',
    'USBIsochronousOutTransferResult',
    'USBIsochronousOutTransferPacket',
    'USBIsochronousInTransferResult',
    'USBIsochronousInTransferPacket',
    'USBInTransferResult',
    'USBInterface',
    'USBEndpoint',
    'USBDevice',
    'USBConnectionEvent',
    'USBConfiguration',
    'USBAlternateInterface',
    'USB',
    'NFC',
    'BluetoothUUID',
    'BluetoothRemoteGATTService',
    'BluetoothRemoteGATTServer',
    'BluetoothRemoteGATTDescriptor',
    'BluetoothRemoteGATTCharacteristic',
    'BluetoothDevice',
    'BluetoothCharacteristicProperties',
    'Bluetooth',
    'WebAuthentication',
    'PublicKeyCredential',
    'AuthenticatorResponse',
    'AuthenticatorAttestationResponse',
    'AuthenticatorAssertionResponse',
    'WebGLRenderingContext',
    'WebGL2RenderingContext',
    'Path2D',
    'CanvasPattern',
    'CanvasGradient',
    'TextDetector',
    'FaceDetector',
    'DetectedText',
    'DetectedFace',
    'DetectedBarcode',
    'BarcodeDetector',
    'NavigationPreloadManager',
    'SensorErrorEvent',
    'Sensor',
    'RelativeOrientationSensor',
    'OrientationSensor',
    'Magnetometer',
    'LinearAccelerationSensor',
    'Gyroscope',
    'AmbientLightSensor',
    'Accelerometer',
    'AbsoluteOrientationSensor',
    'webkitSpeechRecognitionEvent',
    'webkitSpeechRecognitionError',
    'webkitSpeechRecognition',
    'webkitSpeechGrammarList',
    'webkitSpeechGrammar',
    'SpeechSynthesisUtterance',
    'SpeechSynthesisEvent',
    'RemotePlayback',
    'RTCRtpSender',
    'PushSubscriptionOptions',
    'PushSubscription',
    'PushManager',
    'PresentationReceiver',
    'PresentationConnectionList',
    'PresentationRequest',
    'PresentationConnectionCloseEvent',
    'PresentationConnectionAvailableEvent',
    'PresentationConnection',
    'PresentationAvailability',
    'Presentation',
    'PermissionStatus',
    'Permissions',
    'PaymentResponse',
    'PaymentRequestUpdateEvent',
    'PaymentRequest',
    'PaymentAddress',
    'PaymentManager',
    'Notification',
    'VideoPlaybackQuality',
    'TrackDefaultList',
    'TrackDefault',
    'CanvasCaptureMediaStreamTrack',
    'PhotoCapabilities',
    'MediaSettingsRange',
    'ImageCapture',
    'IDBObserverChanges',
    'IDBObserver',
    'IDBObservation',
    'StorageManager',
    'CompositorWorker',
    'BudgetService',
    'BroadcastChannel',
    'SyncManager',
    'BackgroundFetchRegistration',
    'BackgroundFetchManager',
    'BackgroundFetchFetch',
    'AudioParamMap',
    'XSLTProcessor',
    'Worklet',
    'VTTRegion',
    'KeyframeEffectReadOnly',
    'KeyframeEffect',
    'DocumentTimeline',
    'AnimationTimeline',
    'AnimationPlaybackEvent',
    'AnimationEffectTimingReadOnly',
    'AnimationEffectTiming',
    'AnimationEffectReadOnly',
    'Animation',
    'VisualViewport',
    'SharedWorker',
    'PerformanceServerTiming',
    'SVGMPathElement',
    'SVGDiscardElement',
    'SVGAnimationElement',
    'ResizeObserverEntry',
    'ResizeObserver',
    'PerformancePaintTiming',
    'PerformanceObserverEntryList',
    'PerformanceObserver',
    'PerformanceNavigationTiming',
    'IntersectionObserverEntry',
    'IntersectionObserver',
    'StaticRange',
    'InputEvent',
    'DOMRectReadOnly',
    'DOMRect',
    'DOMQuad',
    'DOMPointReadOnly',
    'DOMPoint',
    'DOMMatrixReadOnly',
    'DOMMatrix',
    'ScrollTimeline',
    'StylePropertyMapReadonly',
    'StylePropertyMap',
    'CSSVariableReferenceValue',
    'CSSURLImageValue',
    'CSSUnparsedValue',
    'CSSUnitValue',
    'CSSTranslation',
    'CSSTransformValue',
    'CSSTransformComponent',
    'CSSStyleValue',
    'CSSSkew',
    'CSSScale',
    'CSSRotation',
    'CSSResourceValue',
    'CSSPositionValue',
    'CSSPerspective',
    'CSSNumericValue',
    'CSSMatrixComponent',
    'CSSKeywordValue',
    'CSSImageValue',
    'VideoTrackList',
    'VideoTrack',
    'AudioTrackList',
    'AudioTrack',
    'AccessibleNodeList',
    'AccessibleNode',
    'webkitRTCPeerConnection',
    'webkitMediaStream',
    'WebSocket',
    'WebGLVertexArrayObject',
    'WebGLUniformLocation',
    'WebGLTransformFeedback',
    'WebGLTexture',
    'WebGLSync',
    'WebGLShaderPrecisionFormat',
    'WebGLShader',
    'WebGLSampler',
    'WebGLRenderbuffer',
    'WebGLQuery',
    'WebGLProgram',
    'WebGLFramebuffer',
    'WebGLContextEvent',
    'WebGLBuffer',
    'WebGLActiveInfo',
    'WaveShaperNode',
    'TextEncoder',
    'TextDecoder',
    'SubtleCrypto',
    'StorageEvent',
    'Storage',
    'StereoPannerNode',
    'SourceBufferList',
    'SourceBuffer',
    'ServiceWorkerRegistration',
    'ServiceWorkerContainer',
    'ServiceWorker',
    'ScriptProcessorNode',
    'ScreenOrientation',
    'Response',
    'Request',
    'RTCStatsReport',
    'RTCSessionDescription',
    'RTCRtpReceiver',
    'RTCRtpContributingSource',
    'RTCPeerConnectionIceEvent',
    'RTCPeerConnection',
    'RTCIceCandidate',
    'RTCDataChannelEvent',
    'RTCDataChannel',
    'RTCCertificate',
    'Plugin',
    'PluginArray',
    'PeriodicWave',
    'PasswordCredential',
    'PannerNode',
    'OscillatorNode',
    'OfflineAudioContext',
    'OfflineAudioCompletionEvent',
    'NetworkInformation',
    'MimeType',
    'MimeTypeArray',
    'MediaStreamTrackEvent',
    'MediaStreamTrack',
    'MediaStreamEvent',
    'MediaStream',
    'MediaStreamAudioSourceNode',
    'MediaStreamAudioDestinationNode',
    'MediaSource',
    'MediaRecorder',
    'MediaKeys',
    'MediaKeySystemAccess',
    'MediaKeyStatusMap',
    'MediaKeySession',
    'MediaKeyMessageEvent',
    'MediaEncryptedEvent',
    'MediaElementAudioSourceNode',
    'MediaDevices',
    'MediaDeviceInfo',
    'MIDIPort',
    'MIDIOutputMap',
    'MIDIOutput',
    'MIDIMessageEvent',
    'MIDIInputMap',
    'MIDIInput',
    'MIDIConnectionEvent',
    'MIDIAccess',
    'ImageBitmapRenderingContext',
    'IIRFilterNode',
    'IDBVersionChangeEvent',
    'IDBTransaction',
    'IDBRequest',
    'IDBOpenDBRequest',
    'IDBObjectStore',
    'IDBKeyRange',
    'IDBIndex',
    'IDBFactory',
    'IDBDatabase',
    'IDBCursorWithValue',
    'IDBCursor',
    'Headers',
    'GamepadEvent',
    'Gamepad',
    'GamepadButton',
    'GainNode',
    'FederatedCredential',
    'EventSource',
    'DynamicsCompressorNode',
    'DeviceOrientationEvent',
    'DeviceMotionEvent',
    'DelayNode',
    'DOMError',
    'CryptoKey',
    'Crypto',
    'CredentialsContainer',
    'Credential',
    'ConvolverNode',
    'ConstantSourceNode',
    'CloseEvent',
    'ChannelSplitterNode',
    'ChannelMergerNode',
    'CanvasRenderingContext2D',
    'CacheStorage',
    'Cache',
    'BlobEvent',
    'BiquadFilterNode',
    'BeforeInstallPromptEvent',
    'BatteryManager',
    'BaseAudioContext',
    'AudioScheduledSourceNode',
    'AudioProcessingEvent',
    'AudioParam',
    'AudioNode',
    'AudioListener',
    'AudioDestinationNode',
    'AudioContext',
    'AudioBufferSourceNode',
    'AudioBuffer',
    'AppBannerPromptResult',
    'AnalyserNode',
    'postMessage',
    'blur',
    'focus',
    'close',
    'XPathResult',
    'XPathExpression',
    'XPathEvaluator',
    'XMLSerializer',
    'XMLHttpRequestUpload',
    'XMLHttpRequestEventTarget',
    'XMLHttpRequest',
    'XMLDocument',
    'Worker',
    'Window',
    'WheelEvent',
    'ValidityState',
    'VTTCue',
    'URLSearchParams',
    'URL',
    'UIEvent',
    'TreeWalker',
    'TransitionEvent',
    'TrackEvent',
    'TouchList',
    'TouchEvent',
    'Touch',
    'TimeRanges',
    'TextTrackList',
    'TextTrackCueList',
    'TextTrackCue',
    'TextTrack',
    'TextMetrics',
    'TextEvent',
    'Text',
    'TaskAttributionTiming',
    'StyleSheetList',
    'StyleSheet',
    'ShadowRoot',
    'Selection',
    'SecurityPolicyViolationEvent',
    'Screen',
    'SVGViewElement',
    'SVGUseElement',
    'SVGUnitTypes',
    'SVGTransformList',
    'SVGTransform',
    'SVGTitleElement',
    'SVGTextPositioningElement',
    'SVGTextPathElement',
    'SVGTextElement',
    'SVGTextContentElement',
    'SVGTSpanElement',
    'SVGSymbolElement',
    'SVGSwitchElement',
    'SVGStyleElement',
    'SVGStringList',
    'SVGStopElement',
    'SVGSetElement',
    'SVGScriptElement',
    'SVGSVGElement',
    'SVGRectElement',
    'SVGRect',
    'SVGRadialGradientElement',
    'SVGPreserveAspectRatio',
    'SVGPolylineElement',
    'SVGPolygonElement',
    'SVGPointList',
    'SVGPoint',
    'SVGPatternElement',
    'SVGPathElement',
    'SVGNumberList',
    'SVGNumber',
    'SVGMetadataElement',
    'SVGMatrix',
    'SVGMaskElement',
    'SVGMarkerElement',
    'SVGLinearGradientElement',
    'SVGLineElement',
    'SVGLengthList',
    'SVGLength',
    'SVGImageElement',
    'SVGGraphicsElement',
    'SVGGradientElement',
    'SVGGeometryElement',
    'SVGGElement',
    'SVGForeignObjectElement',
    'SVGFilterElement',
    'SVGFETurbulenceElement',
    'SVGFETileElement',
    'SVGFESpotLightElement',
    'SVGFESpecularLightingElement',
    'SVGFEPointLightElement',
    'SVGFEOffsetElement',
    'SVGFEMorphologyElement',
    'SVGFEMergeNodeElement',
    'SVGFEMergeElement',
    'SVGFEImageElement',
    'SVGFEGaussianBlurElement',
    'SVGFEFuncRElement',
    'SVGFEFuncGElement',
    'SVGFEFuncBElement',
    'SVGFEFuncAElement',
    'SVGFEFloodElement',
    'SVGFEDropShadowElement',
    'SVGFEDistantLightElement',
    'SVGFEDisplacementMapElement',
    'SVGFEDiffuseLightingElement',
    'SVGFEConvolveMatrixElement',
    'SVGFECompositeElement',
    'SVGFEComponentTransferElement',
    'SVGFEColorMatrixElement',
    'SVGFEBlendElement',
    'SVGEllipseElement',
    'SVGElement',
    'SVGDescElement',
    'SVGDefsElement',
    'SVGComponentTransferFunctionElement',
    'SVGClipPathElement',
    'SVGCircleElement',
    'SVGAnimatedTransformList',
    'SVGAnimatedString',
    'SVGAnimatedRect',
    'SVGAnimatedPreserveAspectRatio',
    'SVGAnimatedNumberList',
    'SVGAnimatedNumber',
    'SVGAnimatedLengthList',
    'SVGAnimatedLength',
    'SVGAnimatedInteger',
    'SVGAnimatedEnumeration',
    'SVGAnimatedBoolean',
    'SVGAnimatedAngle',
    'SVGAnimateTransformElement',
    'SVGAnimateMotionElement',
    'SVGAnimateElement',
    'SVGAngle',
    'SVGAElement',
    'Range',
    'RadioNodeList',
    'PromiseRejectionEvent',
    'ProgressEvent',
    'ProcessingInstruction',
    'PopStateEvent',
    'PointerEvent',
    'PerformanceTiming',
    'PerformanceResourceTiming',
    'PerformanceNavigation',
    'PerformanceMeasure',
    'PerformanceMark',
    'PerformanceLongTaskTiming',
    'PerformanceEntry',
    'Performance',
    'PageTransitionEvent',
    'NodeList',
    'NodeIterator',
    'NodeFilter',
    'Node',
    'Navigator',
    'NamedNodeMap',
    'MutationRecord',
    'MutationObserver',
    'MutationEvent',
    'MouseEvent',
    'MessagePort',
    'MessageEvent',
    'MessageChannel',
    'MediaQueryListEvent',
    'MediaQueryList',
    'MediaList',
    'MediaError',
    'Location',
    'KeyboardEvent',
    'InputDeviceCapabilities',
    'ImageData',
    'ImageBitmap',
    'IdleDeadline',
    'History',
    'HashChangeEvent',
    'HTMLVideoElement',
    'HTMLUnknownElement',
    'HTMLUListElement',
    'HTMLTrackElement',
    'HTMLTitleElement',
    'HTMLTextAreaElement',
    'HTMLTemplateElement',
    'HTMLTableSectionElement',
    'HTMLTableRowElement',
    'HTMLTableElement',
    'HTMLTableColElement',
    'HTMLTableCellElement',
    'HTMLTableCaptionElement',
    'HTMLStyleElement',
    'HTMLSpanElement',
    'HTMLSourceElement',
    'HTMLSlotElement',
    'HTMLShadowElement',
    'HTMLSelectElement',
    'HTMLScriptElement',
    'HTMLQuoteElement',
    'HTMLProgressElement',
    'HTMLPreElement',
    'HTMLPictureElement',
    'HTMLParamElement',
    'HTMLParagraphElement',
    'HTMLOutputElement',
    'HTMLOptionsCollection',
    'Option',
    'HTMLOptionElement',
    'HTMLOptGroupElement',
    'HTMLObjectElement',
    'HTMLOListElement',
    'HTMLModElement',
    'HTMLMeterElement',
    'HTMLMetaElement',
    'HTMLMenuElement',
    'HTMLMediaElement',
    'HTMLMarqueeElement',
    'HTMLMapElement',
    'HTMLLinkElement',
    'HTMLLegendElement',
    'HTMLLabelElement',
    'HTMLLIElement',
    'HTMLInputElement',
    'Image',
    'HTMLImageElement',
    'HTMLIFrameElement',
    'HTMLHtmlElement',
    'HTMLHeadingElement',
    'HTMLHeadElement',
    'HTMLHRElement',
    'HTMLFrameSetElement',
    'HTMLFrameElement',
    'HTMLFormElement',
    'HTMLFormControlsCollection',
    'HTMLFontElement',
    'HTMLFieldSetElement',
    'HTMLEmbedElement',
    'HTMLElement',
    'HTMLDocument',
    'HTMLDivElement',
    'HTMLDirectoryElement',
    'HTMLDialogElement',
    'HTMLDetailsElement',
    'HTMLDataListElement',
    'HTMLDListElement',
    'HTMLContentElement',
    'HTMLCollection',
    'HTMLCanvasElement',
    'HTMLButtonElement',
    'HTMLBodyElement',
    'HTMLBaseElement',
    'HTMLBRElement',
    'Audio',
    'HTMLAudioElement',
    'HTMLAreaElement',
    'HTMLAnchorElement',
    'HTMLAllCollection',
    'FormData',
    'FontFaceSetLoadEvent',
    'FontFace',
    'FocusEvent',
    'FileReader',
    'FileList',
    'File',
    'EventTarget',
    'Event',
    'ErrorEvent',
    'Element',
    'DragEvent',
    'DocumentType',
    'DocumentFragment',
    'Document',
    'DataTransferItemList',
    'DataTransferItem',
    'DataTransfer',
    'DOMTokenList',
    'DOMStringMap',
    'DOMStringList',
    'DOMParser',
    'DOMImplementation',
    'DOMException',
    'CustomEvent',
    'CustomElementRegistry',
    'CompositionEvent',
    'Comment',
    'ClipboardEvent',
    'Clipboard',
    'CharacterData',
    'CSSViewportRule',
    'CSSSupportsRule',
    'CSSStyleSheet',
    'CSSStyleRule',
    'CSSStyleDeclaration',
    'CSSRuleList',
    'CSSRule',
    'CSSPageRule',
    'CSSNamespaceRule',
    'CSSMediaRule',
    'CSSKeyframesRule',
    'CSSKeyframeRule',
    'CSSImportRule',
    'CSSGroupingRule',
    'CSSFontFaceRule',
    'CSS',
    'CSSConditionRule',
    'CDATASection',
    'Blob',
    'BeforeUnloadEvent',
    'BarProp',
    'Attr',
    'ApplicationCacheErrorEvent',
    'ApplicationCache',
    'AnimationEvent',
    'WebKitCSSMatrix',
    'WebKitMutationObserver',
    'WebKitAnimationEvent',
    'WebKitTransitionEvent',
    'onerror',
    'onload',
    'stop',
    'open',
    'alert',
    'confirm',
    'prompt',
    'print',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'requestIdleCallback',
    'cancelIdleCallback',
    'captureEvents',
    'releaseEvents',
    'getComputedStyle',
    'matchMedia',
    'moveTo',
    'moveBy',
    'resizeTo',
    'resizeBy',
    'getSelection',
    'find',
    'getMatchedCSSRules',
    'webkitRequestAnimationFrame',
    'webkitCancelAnimationFrame',
    'btoa',
    'atob',
    'setTimeout',
    'clearTimeout',
    'setInterval',
    'clearInterval',
    'createImageBitmap',
    'scroll',
    'scrollTo',
    'scrollBy',
    'fetch',
    'getComputedStyleMap',
    'webkitRequestFileSystem',
    'webkitResolveLocalFileSystemURL',
    'openDatabase',
    'SharedArrayBuffer',
    'Buffer',
    'setImmediate',
    'clearImmediate',
    'require',
    'BudgetState',
    'WebView',
    'measure',
    'profile',
    'dir',
    'dirxml',
    'profileEnd',
    'clear',
    'table',
    'keys',
    'values',
    'debug',
    'undebug',
    'monitor',
    'unmonitor',
    'inspect',
    'copy',
    'getEventListeners',
    'monitorEvents',
    'unmonitorEvents',
    '$',
    '$$',
    '$x',
  ] // During snapshot generation, this is null.
  // After snapshot load and setGlobals() is called, this is an object with global function names as keys and the real
  // global functions as values.
  
  let globalFunctionTrampoline = null // Create a placeholder function to install as a global in place of a function that may be available after snapshot
  // load, at runtime. Uses the current state of globalFunctionTrampoline to either call the real function or throw
  // an appropriate error for improper use.
  
  function makeGlobalPlaceholder(globalFunctionName) {
    return function () {
      if (globalFunctionTrampoline === null) {
        throw new Error(
          `[SNAPSHOT_CACHE_FAILURE] Attempt to call ${globalFunctionName} during snapshot generation ` +
            `or before snapshotResult.setGlobals()`
        )
      } else if (globalFunctionTrampoline[globalFunctionName] === undefined) {
        throw new ReferenceError(
          `[SNAPSHOT_CACHE_FAILURE] Global method ${globalFunctionName} was still not ` +
            `defined after the snapshot was loaded`
        )
      } else if (new.target === undefined) {
        // Not called as a constructor
        return globalFunctionTrampoline[globalFunctionName](...arguments)
      } else {
        // Called as a constructor
        return new globalFunctionTrampoline[globalFunctionName](...arguments)
      }
    }
  } // Install a placeholder function for each global function we expect to have access to at runtime. Placeholder
  // functions are set as properties on our "global" stand-in and also in this function's scope, so bare references
  // will also capture the placeholder function (`var a = setTimeout` and `var a = global.setTimeout`).
  
  for (const globalFunctionName of globalFunctionNames) {
    if (outerScope[globalFunctionName] !== undefined) {
      // This happens when the snapshot script is eval'd in tests.
      continue
    }
  
    const placeholder = makeGlobalPlaceholder(globalFunctionName)
    Object.defineProperties(global, {
      [globalFunctionName]: {
        value: placeholder,
        enumerable: false,
      },
    })
    outerScope[globalFunctionName] = placeholder
  }
  
  let window = {}
  Object.defineProperties(window, {
    document: {
      value: document,
      enumerable: false,
    },
    location: {
      value: {
        href: '',
      },
      enumerable: false,
    },
    addEventListener: {
      value: function () {},
      enumerable: false,
    },
    screen: {
      value: {},
      enumerable: false,
    },
  })
  
  function get_window() {
    return window
  }
  
  let console = {}
  
  function consoleNoop() {
    throw new Error(
      '[SNAPSHOT_CACHE_FAILURE] Cannot use `console` functions in the snapshot.'
    )
  }
  
  Object.defineProperties(console, {
    debug: {
      value: consoleNoop,
      enumerable: false,
    },
    error: {
      value: consoleNoop,
      enumerable: false,
    },
    info: {
      value: consoleNoop,
      enumerable: false,
    },
    log: {
      value: consoleNoop,
      enumerable: false,
    },
    warn: {
      value: consoleNoop,
      enumerable: false,
    },
    time: {
      value: consoleNoop,
      enumerable: false,
    },
    timeEnd: {
      value: consoleNoop,
      enumerable: false,
    },
  })
  
  function get_console() {
    return console
  }
  
  // Resolves paths like __dirname/__filename relative to projectBaseDir
  let __pathResolver = {}
  Object.defineProperties(__pathResolver, {
    resolve: {
      value: function resolve(_local) {
        throw new Error(
          '[SNAPSHOT_CACHE_FAILURE] Cannot resolve `__dirname` in the snapshot'
        )
      },
      enumerable: false,
    },
  })
  
  function __resolve_path(dir) {
    return __pathResolver.resolve(dir)
  }
  
  //
  // </globals>
  //
  
  

  const coreStubs = {
  }

  //
  // <esbuild bundle>
  //
var __commonJS = {};

// lib/util.js
__commonJS["./lib/util.js"] = function(exports, module2, __filename, __dirname, require) {
  "use strict";

let fs;
function __get_fs__() {
  return fs = fs || (require("fs"))
}
  var COMMENT1 = "This is just included to demonstrate the snapshot related rewrite that is performed";
  function getFileSize() {
    return (__get_fs__()).readFileSync(__resolve_path(typeof __filename2 !== 'undefined' ? __filename2 : __filename)).byteLength;
  }
  var COMMENT2 = `
Via 'prepareStackTrace' override the stack is mapped using the same sourcemap that is inlined
at the bottom of the snapshot bundle. (see Console log)
I would expect DevTools to show './lib/util.js:19' in a separate tab when the 'debugger'
statement hits
`;
  function add(a, b) {
    get_console().log(new Error("Should be ./lib/util.js:18.20").stack);
    debugger;
    return a + b;
  }
  module2.exports = {add, getFileSize, COMMENT1, COMMENT2};
};

  //
  // </esbuild bundle>
  //

  customRequire.definitions = __commonJS 

  //
  // <custom-require>
  //
  let require = (moduleName) => {
    throw new Error(
      `[SNAPSHOT_CACHE_FAILURE] Cannot require module "${moduleName}"`
    )
  }
  
  // Some modules check for `module.parent` in order to to determine if they are
  // run from CLI or are being required.
  // Providing an empty one fixes those cases. Once that isn't sufficient we'll
  // need to pass the `module` from `require` calls generated by esbuild.
  function customRequire(modulePath, parent = {}) {
    let module = customRequire.cache[modulePath]
  
    if (!module) {
      // NOTE: the modulePath may be relative to the projectBaseDir, however since
      // access to __dirname/__filename is redirected to a path resolver via the esbuild
      // snapshot rewriter we don't have to "fix" it here.
      // @see ../loading/snapshot-require.ts
      const filename = modulePath
      const dirname = filename.split('/').slice(0, -1).join('/')
  
      module = {
        exports: {},
        children: [],
        loaded: true,
        parent,
        paths: (parent != null && parent.paths) || [],
        require: customRequire,
        filename,
        id: filename,
        path: filename,
      }
  
      function define(callback) {
        callback(customRequire, module.exports, module)
      }
  
      if (customRequire.definitions.hasOwnProperty(modulePath)) {
        module.parent = parent
        customRequire.cache[modulePath] = module
        customRequire.definitions[modulePath].apply(module.exports, [
          module.exports,
          module,
          filename,
          dirname,
          customRequire,
          define,
        ])
      } else if (coreStubs.hasOwnProperty(modulePath)) {
        module.exports = coreStubs[modulePath]
        // we don't cache core modules but only serve stubs to not break snapsshotting
      } else {
        try {
          module.exports = require(modulePath)
          customRequire.cache[modulePath] = module
        } catch (err) {
          // If we're running in doctor (strict) mode avoid trying to resolve core modules by path
          if (require.isStrict) {
            throw err
          } else {
            debugger
            throw new Error(`Failed to require ${modulePath}.\n${err.toString()}`)
          }
        }
      }
    }
  
    return module.exports
  }
  
  customRequire.extensions = {}
  customRequire.cache = {}
  
  customRequire.resolve = function (mod) {
    try {
      return require.resolve(mod)
    } catch (err) {
      // console.error(err.toString())
      // console.error('Failed to resolve', mod)
      // debugger
      throw err
    }
  }
  //
  // </custom-require>
  //
  
  

  customRequire("./lib/util.js")
  return {
    customRequire,
    setGlobals: function setGlobals(
    newGlobal,
    newProcess,
    newWindow,
    newDocument,
    newConsole,
    newPathResolver,
    nodeRequire
  ) {
    // Populate the global function trampoline with the real global functions defined on newGlobal.
    globalFunctionTrampoline = newGlobal
  
    for (let key of Object.keys(global)) {
      newGlobal[key] = global[key]
    }
  
    global = newGlobal
  
    if (typeof newProcess !== 'undefined') {
      for (let key of Object.keys(process)) {
        newProcess[key] = process[key]
      }
    }
  
    process = newProcess
  
    if (typeof newWindow !== 'undefined') {
      for (let key of Object.keys(window)) {
        newWindow[key] = window[key]
      }
    }
  
    window = newWindow
  
    if (typeof newDocument !== 'undefined') {
      for (let key of Object.keys(document)) {
        newDocument[key] = document[key]
      }
    }
  
    document = newDocument
  
    for (let key of Object.keys(console)) {
      newConsole[key] = console[key]
    }
  
    console = newConsole
    __pathResolver = newPathResolver
    require = nodeRequire
  }
  ,
  }
}
var snapshotResult = generateSnapshot.call({})
generateSnapshot = null
snapshotAuxiliaryData.sourceMap = {"version":3,"sources":["lib/util.js"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA;AAAA;AAEA;AAAA;AAAA;AAAA,qBAAW,QAAQ;AAAA;AAEnB,MAAM,WACJ;AACF,yBAAuB;AACrB,WAAO,eAAG,aAAa,+EAAY;AAAA;AAGrC,MAAM,WAAW;AAAA;AAAA;AAAA;AAAA;AAAA;AAMjB,eAAa,GAAG,GAAG;AACjB,kBAAQ,IAAI,IAAI,MAAM,iCAAiC;AACvD;AACA,WAAO,IAAI;AAAA;AAGb,UAAO,UAAU,CAAE,KAAK,aAAa,UAAU;AAAA","file":"<embedded>","sourceRoot":"","sourcesContent":["'use strict'\n\nconst fs = require('fs')\n\nconst COMMENT1 =\n  'This is just included to demonstrate the snapshot related rewrite that is performed'\nfunction getFileSize() {\n  return fs.readFileSync(__filename).byteLength\n}\n\nconst COMMENT2 = `\nVia 'prepareStackTrace' override the stack is mapped using the same sourcemap that is inlined\nat the bottom of the snapshot bundle. (see Console log)\nI would expect DevTools to show './lib/util.js:19' in a separate tab when the 'debugger'\nstatement hits\n`\nfunction add(a, b) {\n  console.log(new Error('Should be ./lib/util.js:18.20').stack)\n  debugger\n  return a + b\n}\n\nmodule.exports = { add, getFileSize, COMMENT1, COMMENT2 }\n"]}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBLHFCQUFXLFFBQVE7QUFBQTtBQUVuQixNQUFNLFdBQ0o7QUFDRix5QkFBdUI7QUFDckIsV0FBTyxlQUFHLGFBQWEsK0VBQVk7QUFBQTtBQUdyQyxNQUFNLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTWpCLGVBQWEsR0FBRyxHQUFHO0FBQ2pCLGtCQUFRLElBQUksSUFBSSxNQUFNLGlDQUFpQztBQUN2RDtBQUNBLFdBQU8sSUFBSTtBQUFBO0FBR2IsVUFBTyxVQUFVLENBQUUsS0FBSyxhQUFhLFVBQVU7QUFBQSIsImZpbGUiOiI8ZW1iZWRkZWQ+Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuY29uc3QgQ09NTUVOVDEgPVxuICAnVGhpcyBpcyBqdXN0IGluY2x1ZGVkIHRvIGRlbW9uc3RyYXRlIHRoZSBzbmFwc2hvdCByZWxhdGVkIHJld3JpdGUgdGhhdCBpcyBwZXJmb3JtZWQnXG5mdW5jdGlvbiBnZXRGaWxlU2l6ZSgpIHtcbiAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhfX2ZpbGVuYW1lKS5ieXRlTGVuZ3RoXG59XG5cbmNvbnN0IENPTU1FTlQyID0gYFxuVmlhICdwcmVwYXJlU3RhY2tUcmFjZScgb3ZlcnJpZGUgdGhlIHN0YWNrIGlzIG1hcHBlZCB1c2luZyB0aGUgc2FtZSBzb3VyY2VtYXAgdGhhdCBpcyBpbmxpbmVkXG5hdCB0aGUgYm90dG9tIG9mIHRoZSBzbmFwc2hvdCBidW5kbGUuIChzZWUgQ29uc29sZSBsb2cpXG5JIHdvdWxkIGV4cGVjdCBEZXZUb29scyB0byBzaG93ICcuL2xpYi91dGlsLmpzOjE5JyBpbiBhIHNlcGFyYXRlIHRhYiB3aGVuIHRoZSAnZGVidWdnZXInXG5zdGF0ZW1lbnQgaGl0c1xuYFxuZnVuY3Rpb24gYWRkKGEsIGIpIHtcbiAgY29uc29sZS5sb2cobmV3IEVycm9yKCdTaG91bGQgYmUgLi9saWIvdXRpbC5qczoxOC4yMCcpLnN0YWNrKVxuICBkZWJ1Z2dlclxuICByZXR1cm4gYSArIGJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZCwgZ2V0RmlsZVNpemUsIENPTU1FTlQxLCBDT01NRU5UMiB9XG4iXX0=