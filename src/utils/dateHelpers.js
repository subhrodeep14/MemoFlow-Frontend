import {
  format,
  isAfter,
  subYears,
} from "date-fns";

/*
─────────────────────────────────────────────
SAFE DATE
NO TIMEZONE SHIFT
─────────────────────────────────────────────
*/

export const safeDate = (
  value
) => {
  if (!value)
    return new Date();

  /*
  STRING:
  2026-05-01
  OR
  2026-05-01T12:00:00
  */

  if (
    typeof value ===
    "string"
  ) {
    const pure =
      value.split("T")[0];

    const [
      y,
      m,
      d,
    ] = pure
      .split("-")
      .map(Number);

    return new Date(
      y,
      m - 1,
      d
    );
  }

  return new Date(value);
};

/*
─────────────────────────────────────────────
YYYY-MM-DD
─────────────────────────────────────────────
*/

export const formatDateKey =
  (date) => {
    return format(
      safeDate(date),
      "yyyy-MM-dd"
    );
  };

/*
─────────────────────────────────────────────
DISPLAY DATE ONLY
─────────────────────────────────────────────
*/

export const formatDisplay =
  (date) => {
    return format(
      safeDate(date),
      "dd MMM yyyy"
    );
  };

export const formatDisplayShort =
  (date) => {
    return format(
      safeDate(date),
      "dd MMM yyyy"
    );
  };

/*
─────────────────────────────────────────────
LOCK
─────────────────────────────────────────────
*/

export const isLocked = (
  date
) => {
  const entryDate =
    safeDate(date);

  const oneYearAgo =
    subYears(
      new Date(),
      1
    );

  return isAfter(
    oneYearAgo,
    entryDate
  );
};

/*
─────────────────────────────────────────────
FILE SIZE
─────────────────────────────────────────────
*/

export const formatFileSize =
  (bytes) => {
    if (bytes < 1024)
      return `${bytes} B`;

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };


  /*
─────────────────────────────────────────────
DATE TIME
─────────────────────────────────────────────
*/

export const formatDateTime =
  (date) => {
    return format(
      safeDate(date),
      "dd MMM yyyy"
    );
  };