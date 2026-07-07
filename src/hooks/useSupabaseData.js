import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

/**
 * A custom hook to fetch data from Supabase, falling back to provided hardcoded data.
 * @param {string} tableName - The name of the Supabase table.
 * @param {Array} fallbackData - The hardcoded array to fallback to.
 * @param {Object} options - Optional configuration (e.g., query modifications, ordering).
 * @returns {Object} { data, loading, error }
 */
export function useSupabaseData(tableName, fallbackData = [], options = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialise options so the effect only re-runs when they meaningfully change
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    let isMounted = true;
    const parsedOptions = JSON.parse(optionsKey);

    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*');

        if (parsedOptions.orderBy) {
          query = query.order(parsedOptions.orderBy, { ascending: parsedOptions.ascending ?? true });
        }
        if (parsedOptions.match) {
          query = query.match(parsedOptions.match);
        }

        const { data: supaData, error: supaError } = await query;

        if (supaError) {
          throw supaError;
        }

        if (isMounted) {
          if (supaData && supaData.length > 0) {
            // Merge fallback data and supabase data so hardcoded items are not lost
            const merged = [...fallbackData];
            supaData.forEach(item => {
              const idx = merged.findIndex(i => i.id === item.id);
              if (idx > -1) {
                merged[idx] = item;
              } else {
                merged.push(item);
              }
            });
            setData(merged);
          } else {
            setData(fallbackData);
          }
        }
      } catch (err) {
        console.error(`Error fetching from ${tableName}:`, err.message);
        if (isMounted) {
          setError(err);
          setData(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName, optionsKey]);

  return { data, loading, error };
}
