INPUT_FILES=(
    "./1me325_u_start/src/js/Dice.js"
    "./1me325_u_start/src/js/Doc.js"
    "./1me325_u_start/src/js/DiceApp.js"
)

OUTPUT_FILE="compiledJs/out.js"

./node_modules/.bin/google-closure-compiler --js=${INPUT_FILES[@]} --js_output_file=$OUTPUT_FILE --language_in=ECMASCRIPT5_STRICT --language_out=ECMASCRIPT5_STRICT

echo "Compilation complete. Output file: $OUTPUT_FILE"