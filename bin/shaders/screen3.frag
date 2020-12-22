#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D screenTexture;

void main()
{
    vec2 offsets[9] = vec2[](
        vec2(-0.005,  0.005),
        vec2( 0.0f,    0.005),
        vec2( 0.005,  0.005),
        vec2(-0.005,  0.0f),
        vec2( 0.0f,    0.0f),
        vec2( 0.005,  0.0f),
        vec2(-0.005, -0.005),
        vec2( 0.0f,   -0.005),
        vec2( 0.005, -0.005)
    );
    
    float kernel[9] = float[](
        1.0 / 16, 2.0 / 16, 1.0 / 16,
        2.0 / 16, 4.0 / 16, 2.0 / 16,
        1.0 / 16, 2.0 / 16, 1.0 / 16
    );

    vec3 sampleTex[9];
    for(int i = 0; i < 9; i++)
    {
        sampleTex[i] = vec3(texture(screenTexture, TexCoords + offsets[i]));
    }
    vec3 col = vec3(0.0);
    for(int i = 0; i < 9; i++)
        col += sampleTex[i] * kernel[i];
    
    FragColor = vec4(col, 1.0);
} 
