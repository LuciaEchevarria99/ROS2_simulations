import {GtaoLevel} from './wb_preferences.js';
import WbWorld from './WbWorld.js';
import WbWrenPostProcessingEffects from '../wren/WbWrenPostProcessingEffects.js';
import WbWrenShaders from '../wren/WbWrenShaders.js';

export default class WbScene {
  #wrenDepthFrameBufferTexture;
  #wrenMainFrameBuffer;
  #wrenMainFrameBufferTexture;
  #wrenNormalFrameBufferTexture;
  constructor() {
    _wrjs_init_context(canvas.clientWidth, canvas.clientHeight);

    _wr_scene_init(_wr_scene_get_instance());

    _wr_gl_state_set_context_active(true);

    this.updateFrameBuffer();

    _wr_scene_set_fog_program(_wr_scene_get_instance(), WbWrenShaders.fogShader());
    _wr_scene_set_shadow_volume_program(_wr_scene_get_instance(), WbWrenShaders.shadowVolumeShader());

    this.#updateWrenViewportDimensions();
  }

  destroy() {
    WbWrenPostProcessingEffects.clearResources();

    if (typeof this.#wrenMainFrameBuffer !== 'undefined')
      _wr_frame_buffer_delete(this.#wrenMainFrameBuffer);

    if (typeof this.#wrenMainFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenMainFrameBufferTexture);

    if (typeof this.#wrenNormalFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenNormalFrameBufferTexture);

    if (typeof this.#wrenDepthFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenDepthFrameBufferTexture);

    this.#wrenMainFrameBuffer = undefined;
    this.#wrenMainFrameBufferTexture = undefined;
    this.#wrenNormalFrameBufferTexture = undefined;
    this.#wrenDepthFrameBufferTexture = undefined;

    WbWorld.instance.scene = undefined;
  }

  updateFrameBuffer() {
    if (typeof this.#wrenMainFrameBuffer !== 'undefined')
      _wr_frame_buffer_delete(this.#wrenMainFrameBuffer);

    if (typeof this.#wrenMainFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenMainFrameBufferTexture);

    if (typeof this.#wrenNormalFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenNormalFrameBufferTexture);

    if (typeof this.#wrenDepthFrameBufferTexture !== 'undefined')
      _wr_texture_delete(this.#wrenDepthFrameBufferTexture);

    this.#wrenMainFrameBuffer = _wr_frame_buffer_new();
    _wr_frame_buffer_set_size(this.#wrenMainFrameBuffer, canvas.width, canvas.height);

    this.#wrenMainFrameBufferTexture = _wr_texture_rtt_new();
    _wr_texture_set_internal_format(this.#wrenMainFrameBufferTexture, Enum.WR_TEXTURE_INTERNAL_FORMAT_RGBA16F);

    this.#wrenNormalFrameBufferTexture = _wr_texture_rtt_new();

    _wr_texture_set_internal_format(this.#wrenNormalFrameBufferTexture, Enum.WR_TEXTURE_INTERNAL_FORMAT_RGBA8);
    _wr_frame_buffer_append_output_texture(this.#wrenMainFrameBuffer, this.#wrenMainFrameBufferTexture);
    if (GtaoLevel < 1)
      _wr_frame_buffer_append_output_texture_disable(this.#wrenMainFrameBuffer, this.#wrenNormalFrameBufferTexture);
    else
      _wr_frame_buffer_append_output_texture(this.#wrenMainFrameBuffer, this.#wrenNormalFrameBufferTexture);
    _wr_frame_buffer_enable_depth_buffer(this.#wrenMainFrameBuffer, true);

    this.#wrenDepthFrameBufferTexture = _wr_texture_rtt_new();
    _wr_texture_set_internal_format(this.#wrenDepthFrameBufferTexture, Enum.WR_TEXTURE_INTERNAL_FORMAT_DEPTH24_STENCIL8);
    _wr_frame_buffer_set_depth_texture(this.#wrenMainFrameBuffer, this.#wrenDepthFrameBufferTexture);

    _wr_frame_buffer_setup(this.#wrenMainFrameBuffer);
    _wr_viewport_set_frame_buffer(_wr_scene_get_viewport(_wr_scene_get_instance()), this.#wrenMainFrameBuffer);

    _wr_viewport_set_size(_wr_scene_get_viewport(_wr_scene_get_instance()), canvas.width, canvas.height);
  }

  // Private functions
  #updateWrenViewportDimensions() {
    _wr_viewport_set_pixel_ratio(_wr_scene_get_viewport(_wr_scene_get_instance()), 1);
  }
}
