export interface PageSpeed {
    firstPaint: string;
    // loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category
    firstInput: string;
    // loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
    firstPaintOrigin: string;
    // originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category
    firstInputOrigin: string;
    // originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
}
