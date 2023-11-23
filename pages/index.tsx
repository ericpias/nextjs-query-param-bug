import Head from "next/head";
import { useRouter } from "next/router";
import parseQueryParams from "@/utils/queryParams";
import MyComponent from "@/utils/MyComponent";

import type { GetServerSideProps } from "next";

type Props = {
  host: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const host = req.headers.host || "";

  return { props: { host } };
};

export default function Home({ host }: any) {
  const router = useRouter();
  // get testParam

  const { _locale, _id, _cid, _slug, ...parsedQueryParams } = parseQueryParams(
    router.query
  ) as any;
  const { _junk, ...parsedParams } = parsedQueryParams;
  const { testParam } = parsedParams;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Main Page</div>
        <p>
          testParam should be a string if only supplied once in the URL query
          params. Otherwise, it should be an array.
        </p>
        {testParam && Array.isArray(testParam) && (
          <div>
            testParam is an array: [
            {testParam.map((item, index) => (!index ? item : `, ${item}`))}]
          </div>
        )}
        {testParam && !Array.isArray(testParam) && (
          <div>testParam is a string: {testParam}</div>
        )}
        {!testParam && (
          <div>
            testParam: not set (hint set it twice to see the bug when deploy in
            netlify)
          </div>
        )}
      </main>
      <MyComponent parsedQueryParams={parsedQueryParams} />
    </>
  );
}
